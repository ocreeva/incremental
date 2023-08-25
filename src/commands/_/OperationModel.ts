import { type CommandId } from '@/constants';
import { assert } from '@/core';
import type { EntityId, InstructionState, OperationState } from '@/types';
import type { ICommandModel, IDeltaValue, IGameContext, IOperationModel } from '@/types/model';
import { DeltaValue } from '@/worker/client';
import { ModelStatus } from '@/constants/worker';

abstract class OperationModel implements IOperationModel {
    private state: OperationState;
    private remaining: number;

    protected constructor(parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        this.state = {
            id: crypto.randomUUID(),
            commandId: this.derived.id,
            parentRoutineId,
            parentSubroutineId,
            delay: 0,
            duration: 42,
            progress: 0,
        };

        this.remaining = this.state.duration;
    }

    public static get id(): CommandId { throw Error("OperationModel derived class has not overridden the static 'id' property."); }

    public get id() { return this.state.id; }
    public get commandId() { return this.state.commandId; }
    public get parentRoutineId() { return this.state.parentRoutineId; }
    public get parentSubroutineId() { return this.state.parentSubroutineId; }

    public get delay() { return this.state.delay; }
    public set delay(delay: number) {
        if (delay === this.state.delay) return;

        this.state.delay = delay;
        this.game.synchronization.updateOperation(this.id, { delay });
    }

    public get duration() { return this.state.duration; }

    public get progress() { return this.state.progress; }
    private set progress(value: number) {
        const progress = Math.min(Math.max(value, 0), 1);
        if (progress === this.state.progress) return;

        this.state.progress = progress;
        this.game.synchronization.updateOperation(this.id, { progress });
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

        this.derived.start(time);

        this.status = ModelStatus.active;
    }

    public synchronize(time: number): void {
        this.assertStatus(ModelStatus.active);

        this.derived.synchronize(time);
    }

    public finalize(time: number): void {
        this.assertStatus(ModelStatus.complete);

        this.derived.finalize(time);

        this.status = ModelStatus.final;
    }

    public abort(time: number): void {
        this.assertStatus(ModelStatus.active);

        this.derived.abort(time);

        this.status = ModelStatus.final;
    }

    public update(time: IDeltaValue): void {
        this.assertStatus(ModelStatus.active);

        const delta = time.allocate(this.remaining);
        this.remaining -= delta;

        const completionDelta = new DeltaValue(this.progress, delta / this.duration);
        this.derived.update(time, completionDelta);

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
