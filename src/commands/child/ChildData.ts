import { CommandId } from '@/constants';
import type { EntityId, GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ChildModel from './ChildModel';

class ChildData extends CommandData {
    public readonly id = CommandId.Child;

    public override createModel(_instruction: InstructionState, parentRoutineId: EntityId, parentSubroutineId: EntityId): GameModel<OperationState> {
        return new ChildModel(parentRoutineId, parentSubroutineId);
    }
}

registerData(new ChildData());
