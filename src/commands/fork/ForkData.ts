import { CommandId } from '@/constants';
import type { CommandModel, InstructionState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ForkModel from './ForkModel';
import { assertIsDefined } from '@/core';

class ForkData extends CommandData {
    public readonly id = CommandId.Fork;

    public override createModel(instruction: InstructionState): CommandModel {
        assertIsDefined(instruction.targetEntityId, 'InstructionState for Fork command should have a targetEntityId.');

        return new ForkModel(instruction.targetEntityId);
    }
}

registerData(new ForkData());
