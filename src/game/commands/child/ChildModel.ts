import { CommandId } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class ChildModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Child;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ChildModel(parentRoutineId, parentSubroutineId);
    }
}

registerModel(ChildModel);
