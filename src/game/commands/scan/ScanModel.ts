import { CommandId, Host, MaxLevelByRole } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { ICommandModel, IDeltaValue, IOperationModel } from '@/types/model';

abstract class ScanNodeModel extends CommandModel {
    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;

    public static override update(completion: IDeltaValue, operationId: EntityId, time: number) {
        super.update(completion, operationId, time);

        const { role } = this.game.getOperation(operationId);
        const maxLevel = MaxLevelByRole[role];

        while (completion.hasUnallocated && this.level < maxLevel) {
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

    // unlock ourself, with no level or progress requirements
    protected static override readonly unlockLevel: number = 0;
    protected static override readonly unlockVisibleSublevel: number = 0;
    protected static override readonly unlockEnabledSublevel: number = 0;
}

class ScanFilesModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Files;

    protected static override readonly unlockLevel: number = 1;
}

class ScanHRModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_HR;

    protected static override readonly unlockLevel: number = 2;
}

class ScanSecurityModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Security;

    protected static override readonly unlockLevel: number = 3;
}

class ScanCoreModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Core;

    protected static override readonly unlockLevel: number = 4;
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

    // unlock ourself, with no level or progress requirements
    protected static override readonly unlockCommandId: CommandId = CommandId.Scan;
    protected static override readonly unlockLevel: number = 0;
    protected static override readonly unlockVisibleSublevel: number = 0;
    protected static override readonly unlockEnabledSublevel: number = 0;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ScanModel(parentRoutineId, parentSubroutineId);
    }

    public static override update(completion: IDeltaValue, operationId: EntityId, time: number): void {
        super.update(completion, operationId, time);

        const { host } = this.game.getOperation(operationId);
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
