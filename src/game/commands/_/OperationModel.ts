import { EntityId } from '@reduxjs/toolkit';

import { Role, Host, ErrorCode } from '@/constants';
import { assert } from '@/core';
import { ICommandModel, IDeltaValue, IGameContext, IOperationModel } from '@/types/model';
import { DeltaValue } from '@/worker/client';
import { ModelStatus } from '@/constants/worker';
import { InstructionData, OperationView } from '@/types';

abstract class OperationModel<TCommandModel extends ICommandModel = ICommandModel> implements IOperationModel {
    private readonly state: OperationView;
    private remaining: number;

    protected readonly command: TCommandModel;

    public constructor(command: ICommandModel, parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        this.command = command as TCommandModel;

        this.state = {
            id: crypto.randomUUID(),
            commandId: this.command.id,
            parentRoutineId,
            parentSubroutineId,
            duration: 840,
            errors: [],
            host: Host.Hub,
            progress: 0,
            role: Role.Anon,
            transition: 0,
        };

        this.remaining = this.duration;
    }

    public get id() { return this.state.id; }
    public get commandId() { return this.state.commandId; }
    public get parentRoutineId() { return this.state.parentRoutineId; }
    public get parentSubroutineId() { return this.state.parentSubroutineId; }

    public get delay() { return this.state.delay ?? 0; }
    public set delay(delay: number) {
        if (delay === this.state.delay) return;

        this.state.delay = delay;
        this.game.synchronization.updateOperation(this.id, { delay });
    }

    public get duration() { return this.state.duration; }

    public get errors(): ReadonlyArray<ErrorCode> { return this.state.errors; }
    public addError(error: ErrorCode): void {
        if (this.state.errors.includes(error)) return;

        this.state.errors.push(error);
        this.game.synchronization.updateOperation(this.id, { errors: this.state.errors });
    }

    public get host() { return this.state.host; }
    public set host(host: Host) {
        if (this.state.host === host) return;

        this.state.host = host;
        this.game.synchronization.updateOperation(this.id, { host });
    }

    public get progress() { return this.state.progress; }
    private set progress(value: number) {
        const progress = Math.min(Math.max(value, 0), 1);
        if (progress === this.state.progress) return;

        this.state.progress = progress;
        this.game.synchronization.updateOperation(this.id, { progress });
    }

    public get role() { return this.state.role; }
    public set role(role: Role) {
        if (this.state.role === role) return;

        this.state.role = role;
        this.game.synchronization.updateOperation(this.id, { role });
    }

    private _status: ModelStatus = ModelStatus.idle;
    public get status(): ModelStatus { return this._status; }
    private set status(value: ModelStatus) { this._status = value; }

    public get transition(): number { return this.state.transition; }
    public set transition(transition: number) {
        if (this.state.transition === transition) return;

        this.state.transition = transition;
        this.game.synchronization.updateOperation(this.id, { transition });
    }

    private _game?: IGameContext;
    protected get game(): IGameContext {
        assert(this._game, "OperationModel 'game' property accessed before initialization.");
        return this._game;
    }
    private set game(game: IGameContext) { this._game = game; }

    public async initializeAsync(game: IGameContext, _instruction: InstructionData): Promise<void> {
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

        this.command.start(time, this.id);

        this.status = ModelStatus.active;
    }

    public synchronize(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public finalize(time: number): void {
        this.assertStatus(ModelStatus.complete);

        this.command.finalize(time, this.id);

        this.status = ModelStatus.final;
    }

    public abort(time: number, cause: ErrorCode): void {
        this.assertStatus(ModelStatus.active, ModelStatus.pending);

        switch (this.status) {
            case ModelStatus.active:
                this.addError(ErrorCode.OperationInterrupted | cause);
                break;

            case ModelStatus.pending:
                this.addError(ErrorCode.OperationUnstarted | cause);
                break;
        }

        this.command.abort(time, cause, this.id);

        this.status = ModelStatus.final;
    }

    public update(time: IDeltaValue): void {
        this.assertStatus(ModelStatus.active);

        const delta = time.allocate(this.remaining);
        this.remaining -= delta;
        this.progress = 1 - this.remaining / this.duration;

        // the Command can only allocate the delta consumed by this operation, so set up a DeltaValue representing such
        const commandDelta = new DeltaValue(time.total - delta, delta);
        this.command.update(commandDelta, this.id);

        if (this.remaining <= 0) this.status = ModelStatus.complete;
    }

    private assertStatus(...expected: ModelStatus[]): void {
        assert(expected.includes(this.status), `Operation status '${this.status}' not in expected value(s): ${expected}`);
    }
}

export default OperationModel;
