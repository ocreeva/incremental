import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import commands from '@/commands/models';
import { CommandId } from '@/constants';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class OverclockModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Overclock;

    public static override synchronize(time: number) {
        super.synchronize(time);

        const scanHubCommand = commands[CommandId.Scan_Hub];
        if ((scanHubCommand.level > 0) || (scanHubCommand.sublevel > 0)) {
            this.isInLexicon = true;
        }
    }

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new OverclockModel(parentRoutineId, parentSubroutineId);
    }

    public static override finalize(operationId: EntityId, time: number) {
        super.finalize(operationId, time);

        this.level = Math.min(this.level + 1, 5);
    }
}

registerModel(OverclockModel);
