import { CommandId } from '@/constants';
import type { CommandModel, InstructionState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ScanModel from './ScanModel';

class ScanData extends CommandData {
    public readonly id = CommandId.Scan;

    public override createModel(_instruction: InstructionState): CommandModel {
        return new ScanModel();
    }
}

registerData(new ScanData());
