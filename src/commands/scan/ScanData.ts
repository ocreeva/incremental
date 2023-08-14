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

class ScanHubData extends CommandData {
    public readonly id = CommandId.ScanHub;

    public override createModel(): GameModel<OperationState> {
        throw Error("ScanHubData does not support the 'createModel' method.");
    }
}

registerData(new ScanData());
registerData(new ScanHubData());
