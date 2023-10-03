import { CommandId, Host, Role } from '@/constants';
import { ModelStatus } from '@/constants/worker';
import { assert } from '@/core';
import type { EntityId, InstructionState, SubroutineState } from '@/types';
import type { IDeltaValue, IGameContext, ISubroutineModel } from '@/types/model';
import { getInstructionAsync, getScriptAsync } from '@/worker/client';

/**
 * Provides the gameplay model for a Subroutine.
 */
class SubroutineModel implements ISubroutineModel {
    /** The duration, in milliseconds, of a transition from the completion of one Operation to the start of the next. */
    private static readonly transitionDuration = 160;

    private readonly state: SubroutineState;

    private lastActiveTime = 0;
    private operationIndex = 0;
    private transitionRemaining = 0;

    public constructor(parentRoutineId: EntityId) {
        this.state = {
            id: crypto.randomUUID(),
            duration: 0,
            operations: [],
            parentRoutineId,
            host: Host.Hub,
            role: Role.Anon,
        };
    }

    public get id(): EntityId { return this.state.id; }
    public get parentRoutineId(): EntityId { return this.state.parentRoutineId; }

    public get duration(): number { return this.state.duration; }
    public set duration(duration: number) {
        if (duration === this.state.duration) return;

        this.state.duration = duration;
        this.game.synchronization.updateSubroutine(this.id, { duration });
    }

    public get host(): Host { return this.state.host; }
    public set host(host: Host) {
        if (host == this.state.host) return;

        this.state.host = host;
        this.game.synchronization.updateSubroutine(this.id, { host });
    }

    public get operations(): EntityId[] { return this.state.operations; }

    public get role(): Role { return this.state.role; }
    public set role(role: Role) {
        if (role === this.state.role) return;

        this.state.role = role;
        this.game.synchronization.updateSubroutine(this.id, { role });
    }

    private _status: ModelStatus = ModelStatus.idle;
    public get status(): ModelStatus { return this._status; }
    private set status(value: ModelStatus) { this._status = value; }

    private _game?: IGameContext;
    protected get game(): IGameContext {
        assert(this._game, "OperationModel 'game' property accessed before initialization.");
        return this._game;
    }
    private set game(value: IGameContext) { this._game = value; }

    public async initializeAsync(game: IGameContext, scriptId: EntityId): Promise<void> {
        this.assertStatus(ModelStatus.idle);
        this.status = ModelStatus.loading;

        this.game = game;

        const isFirstSubroutine = this.game.subroutines.size === 0;

        if (!this.game.subroutines.has(this.id)) {
            this.game.subroutines.set(this.id, this);
            this.game.synchronization.addSubroutine(this.state);
        }

        const { script } = await getScriptAsync(this.game.messageService, { scriptId });

        const operationIds = [
            await this.createBootOperationAsync(script.id, isFirstSubroutine),
            ...await Promise.all(script.instructions.map(instructionId => this.createOperationAsync(instructionId)))
        ];
        operationIds.forEach(operationId => this.operations.push(operationId));
        this.game.synchronization.updateSubroutine(this.id, { operations: this.operations });

        this.calculateDuration();

        this.assertStatus(ModelStatus.loading);
        this.status = ModelStatus.pending;
    }

    public start(time: number) {
        this.assertStatus(ModelStatus.pending);

        const delay = Math.round(time - this.lastActiveTime);
        if (delay > 0) {
            const currentOperationId = this.operations[this.operationIndex];
            const currentOperation = this.game.getOperation(currentOperationId);
            currentOperation.delay = delay;

            this.duration += delay;
        }

        // initialization doesn't synchronize the operations array changes when a subroutine is reallocated
        if (this.operationIndex > 0) {
            this.game.synchronization.updateSubroutine(this.id, { operations: this.operations });
        }

        this.status = ModelStatus.active;
    }

    public synchronize(time: number) {
        this.assertStatus(ModelStatus.active, ModelStatus.complete);

        switch (this.status) {
            case ModelStatus.active: {
                const currentOperation = this.game.getOperation(this.operations[this.operationIndex]);
                switch (currentOperation.status) {
                    case ModelStatus.active:
                        currentOperation.synchronize(time);
                        break;
                }
            }
        }
    }

    public finalize(time: number) {
        this.assertStatus(ModelStatus.complete, ModelStatus.idle);

        this.lastActiveTime = time;

        switch (this.status) {
            case ModelStatus.complete:
                this.status = ModelStatus.final;
                break;
        }
    }

    public abort(time: number) {
        this.assertStatus(ModelStatus.active, ModelStatus.loading, ModelStatus.pending);

        const currentOperation = this.game.getOperation(this.operations[this.operationIndex]);
        if (currentOperation.status === ModelStatus.active) currentOperation.abort(time);

        this.status = ModelStatus.final;
    }

    public update(timeDelta: IDeltaValue) {
        this.assertStatus(ModelStatus.active, ModelStatus.complete);

        while (timeDelta.hasUnallocated) {
            if (this.transitionRemaining > 0) {
                this.updateTransition(timeDelta);
            } else if (this.operationIndex < this.operations.length) {
                this.updateOperation(timeDelta);
            } else {
                this.lastActiveTime = timeDelta.total;
                this.status = ModelStatus.idle;
                return;
            }
        }
    }

    private updateOperation(timeDelta: IDeltaValue): void {
        const currentOperation = this.game.getOperation(this.operations[this.operationIndex]);
        if (currentOperation.status === ModelStatus.pending) {
            currentOperation.start(timeDelta.total);
        }

        currentOperation.update(timeDelta);

        // remaining unallocated indicates the operation completed
        if (currentOperation.status === ModelStatus.complete) {
            currentOperation.finalize(timeDelta.total);
            this.transitionRemaining = SubroutineModel.transitionDuration;
            this.operationIndex++;

            // the routine can complete during the final transition
            if (this.operationIndex >= this.operations.length) this.status = ModelStatus.complete;
        }
    }

    private updateTransition(timeDelta: IDeltaValue): void {
        this.transitionRemaining -= timeDelta.allocate(this.transitionRemaining);
    }

    private assertStatus(...expected: ModelStatus[]): void {
        assert(expected.includes(this.status), `Subroutine status '${this.status}' not in expected value(s): ${expected}`);
    }

    private calculateDuration(): void {
        this.duration = this.operations
            .map(operationId => this.game.getOperation(operationId))
            .reduce((total, { delay, duration }) => total + delay + duration + SubroutineModel.transitionDuration, -SubroutineModel.transitionDuration);
    }

    private createBootOperationAsync(parentScriptId: EntityId, isBoot: boolean): Promise<EntityId> {
        // the first subroutine uses a Boot command; all others use Child commands
        const commandId = isBoot ? CommandId.Boot : CommandId.Child;
        return this.createOperationFromInstructionAsync({
            id: 0,
            commandId,
            parentScriptId,
        });
    }

    private async createOperationAsync(instructionId: EntityId): Promise<EntityId> {
        const { instruction } = await getInstructionAsync(this.game.messageService, { instructionId });
        return await this.createOperationFromInstructionAsync(instruction);
    }

    private async createOperationFromInstructionAsync(instruction: InstructionState): Promise<EntityId> {
        const { commandId } = instruction;
        const command = this.game.commands[commandId];
        return await command.createOperationAsync(instruction, this.parentRoutineId, this.id);
    }
}

export default SubroutineModel;
