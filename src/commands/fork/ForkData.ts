import { CommandId } from '@/constants';
import { assertIsDefined } from '@/core';
import type { CommandState, GameModel, InstructionState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ForkModel from './ForkModel';

class ForkData extends CommandData {
    public readonly id = CommandId.Fork;

    public override createModel(instruction: InstructionState): GameModel<CommandState> {
        assertIsDefined(instruction.targetEntityId, "InstructionState for command 'Fork' should have a 'targetEntityId'.");

        return new ForkModel(instruction.targetEntityId);
    }
}

registerData(new ForkData());
