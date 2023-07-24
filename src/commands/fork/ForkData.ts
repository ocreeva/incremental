import { CommandId } from '@/constants';
import { assertIsDefined } from '@/core';
import type { GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ForkModel from './ForkModel';

class ForkData extends CommandData {
    public readonly id = CommandId.Fork;

    public override createModel(instruction: InstructionState): GameModel<OperationState> {
        assertIsDefined(instruction.targetEntityId, "InstructionState for command 'Fork' should have a 'targetEntityId'.");

        return new ForkModel(instruction.targetEntityId);
    }
}

registerData(new ForkData());
