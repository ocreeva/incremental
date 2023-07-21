import data from '@/game/data';
import type { EntityId, CommandModel, OperationState, TimeContext, Update, UpdateContext } from '@/types';

import { getInstructionAsync } from './client';
import ConceptModel from './ConceptModel';
import type ModelContext from './ModelContext';

export declare type OperationUpdates = {
    operationUpdates: Update<OperationState>[];
};

/**
 * Provides the gameplay model for an Operation.
 */
class OperationModel extends ConceptModel<OperationState> {
    private readonly commandModel: CommandModel;

    constructor(state: OperationState, commandModel: CommandModel) {
        super(state);

        this.commandModel = commandModel;
    }

    public override start(context: UpdateContext) {
        this.commandModel.start(context);
    }

    public override update(context: UpdateContext) {
        this.commandModel.update(context);
    }

    public override finalize(context: UpdateContext) {
        this.commandModel.finalize(context);
    }

    public override progress(context: UpdateContext, time: TimeContext) {
        this.commandModel.progress(context, time);

        this.state.progress = 100 * this.commandModel.elapsed / this.commandModel.duration;
        context.updateOperation(this.state.id, { progress: this.state.progress });
    }

    public static async createAsync(context: ModelContext, instructionId: EntityId): Promise<OperationModel> {
        const { instruction } = await getInstructionAsync(context.messageService, { instructionId });
        const { commandId } = instruction;
        const commandData = data[commandId];
        const commandModel = commandData.createModel(instruction);
        const state: OperationState = {
            id: crypto.randomUUID(),
            commandId,
            duration: commandModel.duration,
            progress: 0,
        };

        return new OperationModel(state, commandModel);
    }
}

export default OperationModel;
