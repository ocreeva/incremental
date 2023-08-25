import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId } from '@/constants';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class ScanModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Scan;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ScanModel(parentRoutineId, parentSubroutineId);
    }

    public override finalize(time: number): void {
        super.finalize(time);

        this.game.synchronization.upsertCommand({ id: CommandId.ScanHub, progress: 0.3 });
    }
}

class ScanHubModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.ScanHub;
}

registerModel(ScanModel);
registerModel(ScanHubModel);
