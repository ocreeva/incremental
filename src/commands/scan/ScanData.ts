import { CommandId } from '@/constants';
import type { GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ScanModel from './ScanModel';

class ScanData extends CommandData {
    public readonly id = CommandId.Scan;

    public override createModel(_instruction: InstructionState): GameModel<OperationState> {
        return new ScanModel();
    }
}

registerData(new ScanData());
