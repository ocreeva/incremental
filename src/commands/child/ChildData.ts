import { CommandId } from '@/constants';
import type { GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ChildModel from './ChildModel';

class ChildData extends CommandData {
    public readonly id = CommandId.Child;

    public override createModel(_instruction: InstructionState): GameModel<OperationState> {
        return new ChildModel();
    }
}

registerData(new ChildData());
