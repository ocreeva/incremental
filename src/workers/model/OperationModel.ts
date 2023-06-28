import ConceptModel from './ConceptModel';
import { getInstructionAsync } from './client';

import type { OperationState } from '@/types';
import type ModelContext from './ModelContext';

/**
 * Provides the gameplay model for an Operation.
 */
class OperationModel extends ConceptModel<OperationState> {
    public static createAsync: (context: ModelContext, instructionId: string) => Promise<OperationModel>
    = async (context, instructionId) => {
        const { instruction } = await getInstructionAsync(context.mainThread, { instructionId });
        const { commandId } = instruction;
        const model = new OperationModel({
            id: crypto.randomUUID(),
            commandId,
            duration: 42,
            progress: 0,
        });
        context.createdOperations.push(model.state);
        return model;
    };
}

export default OperationModel;
