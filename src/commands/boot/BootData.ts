import { CommandId } from '@/constants';
import type { EntityId, GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import BootModel from './BootModel';

class BootData extends CommandData {
    public readonly id = CommandId.Boot;

    public override createModel(_instruction: InstructionState, parentRoutineId: EntityId, parentSubroutineId: EntityId): GameModel<OperationState> {
        return new BootModel(parentRoutineId, parentSubroutineId);
    }
}

registerData(new BootData());
