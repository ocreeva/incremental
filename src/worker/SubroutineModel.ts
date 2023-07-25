import { crash } from '@/core';
import type { EntityId, GameModel, InstructionState, OperationState, SubroutineState, TimeContext, UpdateContext } from '@/types';

import { getInstructionAsync, getScriptAsync } from './client';
import type ModelContext from './ModelContext';
import data from '@/game/data';
import { CommandId } from '@/constants';

export enum SubroutineStatus {
    idle = 'idle',
    loading = 'loading',
    pending = 'pending',
    active = 'active',
}

/**
 * Provides the gameplay model for a Subroutine.
 */
class SubroutineModel implements GameModel<SubroutineState> {
    private static readonly transitionDuration = 8;

    private readonly operations: GameModel<OperationState>[] = [];

    private lastActiveTime = 0;
    private operationIndex = 0;

    private isInTransition = false;
    private transitionElapsed = 0;

    public constructor() {
        this.state = {
            id: crypto.randomUUID(),
            operations: [],
            duration: 0,
        };
    }

    public readonly state: SubroutineState;

    private _status: SubroutineStatus = SubroutineStatus.idle;
    public get status(): SubroutineStatus { return this._status; }
    private set status(value: SubroutineStatus) { this._status = value; }

    public start(context: UpdateContext, time: number) {
        this.assertStatus(SubroutineStatus.pending);

        for (let index = this.operationIndex; index < this.operations.length; index++) {
            context.addOperation(this.operations[index].state);
        }

        const delay = Math.round(time - this.lastActiveTime);
        if (delay > 0) {
            const currentOperation = this.operations[this.operationIndex];
            currentOperation.state.delay = delay;
            context.updateOperation(currentOperation.state.id, { delay });
        }

        this.state.duration = SubroutineModel.calculateDuration(this.operations);

        context.updateSubroutine(this.state.id, {
            operations: this.state.operations,
            duration: this.state.duration,
        });

        this.status = SubroutineStatus.active;
    }

    public update(context: UpdateContext, time: number) {
        this.assertStatus(SubroutineStatus.active);

        this.operations[this.operationIndex].update(context, time);

        const duration = SubroutineModel.calculateDuration(this.operations);
        if (this.state.duration !== duration) {
            this.state.duration = duration;
            context.updateSubroutine(this.state.id, { duration });
        }
    }

    public finalize(_context: UpdateContext, _time: number) {
        this.assertStatus(SubroutineStatus.active);

        this.status = SubroutineStatus.idle;
    }

    public progress(context: UpdateContext, time: TimeContext) {
        this.assertStatus(SubroutineStatus.active);

        while ((time.delta > 0) && (this.isInTransition || this.operationIndex < this.operations.length)) {
            if (this.isInTransition) {
                this.transitionElapsed += time.delta;
                if (this.transitionElapsed > SubroutineModel.transitionDuration) {
                    time.delta = this.transitionElapsed - SubroutineModel.transitionDuration;
                    this.transitionElapsed = 0;
                    this.isInTransition = false;
                    this.operationIndex++;
                } else {
                    time.delta = 0;
                }
            } else {
                const currentOperation = this.operations[this.operationIndex];
                if (currentOperation.state.progress === 0) {
                    currentOperation.start(context, time.total - time.delta);
                }
                currentOperation.progress(context, time);
                if (time.delta > 0) {
                    currentOperation.finalize(context, time.total - time.delta);
                    this.isInTransition = true;
                }
            }
        }
    }

    public async loadScriptAsync(context: ModelContext, scriptId: EntityId, isBoot: boolean): Promise<void> {
        this.assertStatus(SubroutineStatus.idle);
        this.status = SubroutineStatus.loading;

        const { script } = await getScriptAsync(context.messageService, { scriptId });
        const operations = [
            SubroutineModel.createBootOperation(isBoot, script.id),
            ...await Promise.all(script.instructions.map(instructionId => SubroutineModel.createOperationAsync(context, instructionId)))
        ];
        for (const operation of operations) {
            this.operations.push(operation);
            this.state.operations.push(operation.state.id);
        }

        this.assertStatus(SubroutineStatus.loading);
        this.status = SubroutineStatus.pending;
    }

    private static calculateDuration(operations: GameModel<OperationState>[]): number {
        return operations.reduce(
            (_, { state: { delay, duration } }) => _ + delay + duration + SubroutineModel.transitionDuration,
            -SubroutineModel.transitionDuration
        );
    }

    private static createBootOperation(isBoot: boolean, parentScriptId: EntityId): GameModel<OperationState> {
        const commandId = isBoot ? CommandId.Boot : CommandId.Child;
        return this.createOperationFromInstruction({
            id: 0,
            commandId,
            parentScriptId,
        });
    }

    private static async createOperationAsync(context: ModelContext, instructionId: EntityId): Promise<GameModel<OperationState>> {
        const { instruction } = await getInstructionAsync(context.messageService, { instructionId });
        return SubroutineModel.createOperationFromInstruction(instruction);
    }

    private static createOperationFromInstruction(instruction: InstructionState): GameModel<OperationState> {
        const { commandId } = instruction;
        const commandData = data[commandId];
        return commandData.createModel(instruction);
    }

    private assertStatus(expected: SubroutineStatus): void {
        (expected === this.status) || crash(`Subroutine status '${this.status}' does not match expected value '${expected}'.`);
    }
}

export default SubroutineModel;
