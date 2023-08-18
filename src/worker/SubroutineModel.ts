import { crash } from '@/core';
import type { EntityId, GameContext, GameModel, InstructionState, OperationState, SubroutineState, TimeContext, UpdateContext } from '@/types';

import { getInstructionAsync, getScriptAsync } from './client';
import type ModelContext from './ModelContext';
import data from '@/game/data';
import { CommandId } from '@/constants';
import OperationModel from './OperationModel';

export enum SubroutineStatus {
    idle = 'idle',
    loading = 'loading',
    pending = 'pending',
    active = 'active',
    transition = 'transition',
    final = 'final',
}

/**
 * Provides the gameplay model for a Subroutine.
 */
class SubroutineModel implements GameModel<SubroutineState> {
    private static readonly transitionDuration = 8;

    private readonly operations: GameModel<OperationState>[] = [];

    private lastActiveTime = 0;
    private operationIndex = 0;

    private transitionElapsed = 0;

    public constructor(parentRoutineId: EntityId) {
        this.state = {
            id: crypto.randomUUID(),
            duration: 0,
            operations: [],
            parentRoutineId,
        };
    }

    public readonly state: SubroutineState;

    private _status: SubroutineStatus = SubroutineStatus.idle;
    public get status(): SubroutineStatus { return this._status; }
    private set status(value: SubroutineStatus) { this._status = value; }

    public start(_game: GameContext, context: UpdateContext, time: number) {
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

    public update(game: GameContext, context: UpdateContext, time: number) {
        this.assertStatus(SubroutineStatus.active, SubroutineStatus.transition, SubroutineStatus.final);

        this.operations[this.operationIndex].update(game, context, time);

        const duration = SubroutineModel.calculateDuration(this.operations);
        if (this.state.duration !== duration) {
            this.state.duration = duration;
            context.updateSubroutine(this.state.id, { duration });
        }
    }

    public finalize(_game: GameContext, _context: UpdateContext, time: number) {
        this.assertStatus(SubroutineStatus.active, SubroutineStatus.transition, SubroutineStatus.final);

        this.lastActiveTime = time;

        this.status = SubroutineStatus.idle;
    }

    public progress(game: GameContext, context: UpdateContext, time: TimeContext) {
        this.assertStatus(SubroutineStatus.active, SubroutineStatus.transition, SubroutineStatus.final);

        while (time.delta > 0) {
            switch (this.status) {
                case SubroutineStatus.active: {
                    const currentOperation = this.operations[this.operationIndex];
                    if (currentOperation.state.progress === 0) {
                        currentOperation.start(game, context, time.total - time.delta);
                    }
                    currentOperation.progress(game, context, time);
                    if (time.delta > 0) {
                        currentOperation.finalize(game, context, time.total - time.delta);
                        this.status = this.operationIndex === this.operations.length - 1 ? SubroutineStatus.final : SubroutineStatus.transition;
                    }
                    break;
                }

                case SubroutineStatus.transition:
                case SubroutineStatus.final: {
                    this.transitionElapsed += time.delta;
                    if (this.transitionElapsed > SubroutineModel.transitionDuration) {
                        time.delta = this.transitionElapsed - SubroutineModel.transitionDuration;
                        this.transitionElapsed = 0;
                        this.operationIndex++;
                        if (this.status === SubroutineStatus.final) return;

                        this.status = SubroutineStatus.active;
                    } else {
                        time.delta = 0;
                    }
                }
            }
        }
    }

    public async loadScriptAsync(context: ModelContext, scriptId: EntityId, isBoot: boolean): Promise<void> {
        this.assertStatus(SubroutineStatus.idle);
        this.status = SubroutineStatus.loading;

        const { script } = await getScriptAsync(context.messageService, { scriptId });
        const operations = [
            this.createBootOperation(isBoot, script.id),
            ...await Promise.all(script.instructions.map(instructionId => this.createOperationAsync(context, instructionId)))
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

    private createBootOperation(isBoot: boolean, parentScriptId: EntityId): GameModel<OperationState> {
        const commandId = isBoot ? CommandId.Boot : CommandId.Child;
        return this.createOperationFromInstruction({
            id: 0,
            commandId,
            parentScriptId,
        });
    }

    private async createOperationAsync(context: ModelContext, instructionId: EntityId): Promise<GameModel<OperationState>> {
        const { instruction } = await getInstructionAsync(context.messageService, { instructionId });
        return this.createOperationFromInstruction(instruction);
    }

    private createOperationFromInstruction(instruction: InstructionState): GameModel<OperationState> {
        const { commandId } = instruction;
        const commandData = data[commandId];
        const commandModel = commandData.createModel(instruction);
        const operationModel = new OperationModel(commandModel, this.state.parentRoutineId, this.state.id);
        return operationModel;
    }

    private assertStatus(...expected: SubroutineStatus[]): void {
        expected.includes(this.status) || crash(`Subroutine status '${this.status}' not in expected value(s): ${expected}`);
    }
}

export default SubroutineModel;
