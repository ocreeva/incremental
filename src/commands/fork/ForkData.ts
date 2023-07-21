import { CommandId } from '@/constants';
import type { CommandModel, InstructionState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ForkModel from './ForkModel';

class ForkData extends CommandData {
    public readonly id = CommandId.Fork;

    public override createModel(_instruction: InstructionState): CommandModel {
        return new ForkModel();
    }
}

registerData(new ForkData());
