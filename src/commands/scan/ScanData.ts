import { CommandId } from '@/constants';
import type { EntityId, GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ScanModel from './ScanModel';

class ScanData extends CommandData {
    public readonly id = CommandId.Scan;

    public override createModel(_instruction: InstructionState, parentRoutineId: EntityId, parentSubroutineId: EntityId): GameModel<OperationState> {
        return new ScanModel(parentRoutineId, parentSubroutineId);
    }
}

registerData(new ScanData());
