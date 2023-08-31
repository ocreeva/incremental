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

    public static override update(time: IDeltaValue, completion: IDeltaValue): void {
        ScanHubModel.update(time, completion);
    }
}

class ScanHubModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.ScanHub;

    public static override update(_time: IDeltaValue, completion: IDeltaValue) {
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

registerModel(ScanModel);
registerModel(ScanHubModel);
