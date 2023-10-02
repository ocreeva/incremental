import { epsilon, type CommandId, Role, Host } from '@/constants';
import { assert } from '@/core';
import type { EntityId, InstructionState, OperationState } from '@/types';
import type { ICommandModel, IDeltaValue, IGameContext, IOperationModel } from '@/types/model';
import { DeltaValue } from '@/worker/client';
import { ModelStatus } from '@/constants/worker';

abstract class OperationModel implements IOperationModel {
    private readonly state: OperationState;
    private remaining: number;

    protected constructor(parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        this.state = {
            id: crypto.randomUUID(),
            commandId: this.derived.id,
            parentRoutineId,
            parentSubroutineId,
            delay: 0,
            duration: 42,
            host: Host.Hub,
            progress: 0,
            role: Role.Anon,
        };

        this.id = this.state.id;
        this.parentRoutineId = parentRoutineId;
        this.parentSubroutineId = parentSubroutineId;

        // add epsilon to overshoot any floating point math loss
        this.remaining = this.duration + epsilon;
    }

    public static get id(): CommandId { throw Error("OperationModel derived class has not overridden the static 'id' property."); }

    public readonly id: EntityId;
    public readonly commandId: CommandId = this.derived.id;
    public readonly parentRoutineId: EntityId;
    public readonly parentSubroutineId: EntityId;

    private _delay = 0;
    public get delay() { return this._delay; }
    public set delay(delay: number) {
        if (delay === this._delay) return;

        this._delay = delay;
        this.game.synchronization.updateOperation(this.id, { delay });
    }

    private _duration = 42;
    public get duration() { return this._duration; }

    private _host: Host = Host.Hub;
    public get host() { return this._host; }
    public set host(host: Host) {
        if (this._host === host) return;

        this._host = host;
        this.game.synchronization.updateOperation(this.id, { host });
    }

    private _progress = 0;
    public get progress() { return this._progress; }
    private set progress(value: number) {
        const progress = Math.min(Math.max(value, 0), 1);
        if (progress === this._progress) return;

        this._progress = progress;
        this.game.synchronization.updateOperation(this.id, { progress });
    }

    private _role: Role = Role.Anon;
    public get role() { return this._role; }
    public set role(role: Role) {
        if (this._role === role) return;

        this._role = role;
        this.game.synchronization.updateOperation(this.id, { role });
    }

    private _status: ModelStatus = ModelStatus.idle;
    public get status(): ModelStatus { return this._status; }
    private set status(value: ModelStatus) { this._status = value; }

    private _game?: IGameContext;
    protected get game(): IGameContext {
        assert(this._game, "OperationModel 'game' property accessed before initialization.");
        return this._game;
    }
    private set game(game: IGameContext) { this._game = game; }

    private get derived(): ICommandModel { return this.constructor as unknown as ICommandModel; }

    public async initializeAsync(game: IGameContext, _instruction: InstructionState): Promise<void> {
        this.assertStatus(ModelStatus.idle);
        this.status = ModelStatus.loading;

        this.game = game;
        assert(this.game.operations.has(this.id), `Operation (${this.id}) missing from game context during initialization.`);

        this.game.synchronization.addOperation(this.state);

        this.assertStatus(ModelStatus.loading);
        this.status = ModelStatus.pending;
    }

    public start(time: number): void {
        this.assertStatus(ModelStatus.pending);

        const { host, role } = this.game.getSubroutine(this.parentSubroutineId);
        this.host = host;
        this.role = role;

        this.derived.start(this.id, time);

        this.status = ModelStatus.active;
    }

    public synchronize(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public finalize(time: number): void {
        this.assertStatus(ModelStatus.complete);

        this.derived.finalize(this.id, time);

        this.status = ModelStatus.final;
    }

    public abort(time: number): void {
        this.assertStatus(ModelStatus.active);

        this.derived.abort(this.id, time);

        this.status = ModelStatus.final;
    }

    public update(time: IDeltaValue): void {
        this.assertStatus(ModelStatus.active);

        const delta = time.allocate(this.remaining);
        this.remaining -= delta;

        const completionDelta = new DeltaValue(this.progress, delta / this.duration);
        this.derived.update(completionDelta, this.id, time.total);

        // ensure all 'completion' delta has been allocated, in case the command model didn't allocate it
        completionDelta.allocate(1);
        this.progress = completionDelta.total;

        if (this.remaining <= 0) this.status = ModelStatus.complete;
    }

    private assertStatus(...expected: ModelStatus[]): void {
        assert(expected.includes(this.status), `Operation status '${this.status}' not in expected value(s): ${expected}`);
    }
}

export default OperationModel;
