import ConceptModel from './ConceptModel';
import OperationModel from './OperationModel';
import { getScriptAsync } from './client';

import type { SubroutineState } from '@/types';
import type ModelContext from './ModelContext';
import type { OperationUpdates } from './OperationModel';
import type UpdateContext from './UpdateContext';

/**
 * Provides the gameplay model for a Subroutine.
 */
export class SubroutineModel extends ConceptModel<SubroutineState> {
    public readonly operations: OperationModel[];

    constructor(model: SubroutineState, operations: OperationModel[]) {
        super(model);
        this.operations = operations;
    }

    public static createAsync: (context: ModelContext, scriptId: string) => Promise<SubroutineModel>
    = async (context, scriptId) => {
        const { script } = await getScriptAsync(context.mainThread, { scriptId });
        const operations = await Promise.all(script.instructions.map(instructionId => OperationModel.createAsync(context, instructionId)));
        const model = new SubroutineModel({
            id: crypto.randomUUID(),
            operations: operations.map(({ state: { id } }) => id),
            duration: SubroutineModel._calculateDuration(operations),
        }, operations);
        context.createdSubroutines.push(model.state);
        return model;
    };

    public update: (context: UpdateContext, updates: OperationUpdates) => void
    = (context, updates) => {
        this.operations[0].update(context, updates);
    };

    private static _calculateDuration: (operations: OperationModel[]) => number
    = (operations) => Math.max(0, operations.reduce((_, operation) => _ + operation.state.duration + 8, -8));
}
