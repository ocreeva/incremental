import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId } from '@/constants';
import type { EntityId } from '@/types';
import type { IDeltaValue, IOperationModel } from '@/types/model';

class ScanModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Scan;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ScanModel(parentRoutineId, parentSubroutineId);
    }

    public static override synchronize(time: number) {
        super.synchronize(time);

        this.isInLexicon = true;
    }

    public static override update(completion: IDeltaValue, operationId: EntityId, time: number): void {
        super.update(completion, operationId, time);

        ScanHubModel.update(completion, operationId, time);
    }
}

abstract class ScanNodeModel extends CommandModel {
    public static override update(completion: IDeltaValue, operationId: EntityId, time: number) {
        super.update(completion, operationId, time);

        while (completion.hasUnallocated && this.level < 1) {
            const remaining = (this.sublevel + 1) * 0.2 - this.progress;
            const multiplier = 5 * (this.level + 1) * (this.sublevel + 1);
            this.progress += completion.allocate(remaining * multiplier) / multiplier;

            if (this.progress >= 1) {
                this.level += 1;
                this.progress = 0;
            }
        }
    }
}

class ScanFilesModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.ScanFiles;
}

class ScanHubModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.ScanHub;
}

registerModel(ScanModel);
registerModel(ScanFilesModel);
registerModel(ScanHubModel);
