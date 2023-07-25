import { CommandId } from '@/constants';
import type { GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import BootModel from './BootModel';

class BootData extends CommandData {
    public readonly id = CommandId.Boot;

    public override createModel(_instruction: InstructionState): GameModel<OperationState> {
        return new BootModel();
    }
}

registerData(new BootData());
