import { crash } from '@/core';
import type { EntityId, SubroutineState, TimeContext, UpdateContext } from '@/types';

import { getScriptAsync } from './client';
import ConceptModel from './ConceptModel';
import type ModelContext from './ModelContext';
import OperationModel from './OperationModel';

export enum SubroutineStatus {
    idle = 'idle',
    pending = 'pending',
    active = 'active',
}

/**
 * Provides the gameplay model for a Subroutine.
 */
class SubroutineModel extends ConceptModel<SubroutineState> {
    private readonly operations: OperationModel[];

    private operationIndex = 0;

    private constructor(state: SubroutineState, operations: OperationModel[]) {
        super(state);
        this.operations = operations;
    }

    private _status: SubroutineStatus = SubroutineStatus.pending;
    public get status(): SubroutineStatus { return this._status; }
    private set status(value: SubroutineStatus) { this._status = value; }

    public override start(context: UpdateContext) {
        this.assertStatus(SubroutineStatus.pending);

        this.operations.forEach(operation => context.addOperation(operation.state));
        context.addSubroutine(this.state);

        this.status = SubroutineStatus.active;
    }

    public override update(context: UpdateContext) {
        this.assertStatus(SubroutineStatus.active);

        this.operations[this.operationIndex].update(context);

        const duration = SubroutineModel.calculateDuration(this.operations);
        if (this.state.duration !== duration) {
            this.state.duration = duration;
            context.updateSubroutine(this.state.id, { duration });
        }
    }

    public override finalize(_context: UpdateContext) {
        this.assertStatus(SubroutineStatus.active);

        this.status = SubroutineStatus.idle;
    }

    public override progress(context: UpdateContext, time: TimeContext) {
        this.assertStatus(SubroutineStatus.active);

        while ((time.delta > 0) && (this.operationIndex < this.operations.length)) {
            const currentOperation = this.operations[this.operationIndex];
            currentOperation.progress(context, time);
            if (time.delta > 0) {
                currentOperation.finalize(context);
                this.operationIndex++;
            }
        }
    }

    public static async createAsync(context: ModelContext, scriptId: EntityId): Promise<SubroutineModel> {
        const { script } = await getScriptAsync(context.messageService, { scriptId });
        const operations = await Promise.all(script.instructions.map(instructionId => OperationModel.createAsync(context, instructionId)));
        const state: SubroutineState = {
            id: crypto.randomUUID(),
            operations: operations.map(({ state: { id } }) => id),
            duration: SubroutineModel.calculateDuration(operations),
        };
        return new SubroutineModel(state, operations);
    }

    private static calculateDuration: (operations: OperationModel[]) => number
    = (operations) => Math.max(0, operations.reduce((_, operation) => _ + operation.state.duration + 8, -8));

    private assertStatus(expected: SubroutineStatus): void {
        (expected === this.status) || crash(`Subroutine status '${this.status}' does not match expected value '${expected}'.`);
    }
}

export default SubroutineModel;
