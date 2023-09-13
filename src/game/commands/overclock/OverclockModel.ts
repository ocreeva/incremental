import { CommandId } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class OverclockModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Overclock;

    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
    protected static override readonly unlockLevel: number = 0;
    protected static override readonly unlockVisibleSublevel: number = 4;
    protected static override readonly unlockEnabledSublevel: number = 5;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new OverclockModel(parentRoutineId, parentSubroutineId);
    }

    public static override finalize(operationId: EntityId, time: number) {
        super.finalize(operationId, time);

        this.level = Math.min(this.level + 1, 5);
    }
}

registerModel(OverclockModel);
