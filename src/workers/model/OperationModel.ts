import ConceptModel from './ConceptModel';
import { getInstructionAsync } from './client';

import type { Update } from '@reduxjs/toolkit';
import type { OperationState } from '@/types';
import type ModelContext from './ModelContext';
import type UpdateContext from './UpdateContext';

export declare type OperationUpdates = {
    operationUpdates: Update<OperationState>[];
};

/**
 * Provides the gameplay model for an Operation.
 */
class OperationModel extends ConceptModel<OperationState> {
    private _elapsed: number = 0;

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

    public update: (context: UpdateContext, updates: OperationUpdates) => void
    = (context, updates) => {
        this._elapsed += context.deltaTime;
        if (this._elapsed >= this.state.duration) {
            context.deltaTime = this._elapsed - this.state.duration;
            this._elapsed = this.state.duration;
        } else {
            context.deltaTime = 0;
        }

        this.state.progress = 100 * this._elapsed / this.state.duration;
        updates.operationUpdates.push({ id: this.state.id, changes: { progress: this.state.progress } });
    };
}

export default OperationModel;
