import { CommandId } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class BootModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Boot;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new BootModel(parentRoutineId, parentSubroutineId);
    }
}

registerModel(BootModel);
