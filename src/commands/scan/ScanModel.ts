import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId, Host } from '@/constants';
import type { EntityId } from '@/types';
import type { ICommandModel, IDeltaValue, IOperationModel } from '@/types/model';

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

class ScanHubModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Hub;
}

class ScanFilesModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Files;
}

class ScanHRModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_HR;
}

class ScanSecurityModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Security;
}

class ScanCoreModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Core;
}

const modelLookup: Record<Host, ICommandModel> = {
    [Host.Hub]: ScanHubModel,
    [Host.Files]: ScanFilesModel,
    [Host.HR]: ScanHRModel,
    [Host.Security]: ScanSecurityModel,
    [Host.Core]: ScanCoreModel,
};

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

        const { parentSubroutineId } = this.game.getOperation(operationId);
        const { host } = this.game.getSubroutine(parentSubroutineId);
        const model = modelLookup[host];
        model.update(completion, operationId, time);
    }
}

registerModel(ScanModel);
registerModel(ScanFilesModel);
registerModel(ScanHRModel);
registerModel(ScanHubModel);
registerModel(ScanCoreModel);
registerModel(ScanSecurityModel);
