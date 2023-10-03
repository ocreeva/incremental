import { CommandId, Host } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { ICommandModel, IDeltaValue, IOperationModel } from '@/types/model';

abstract class ScanNodeModel extends CommandModel {
    protected static override readonly shouldAccumulateTime: boolean = true;

    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
}

class ScanHubModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Hub;

    protected static override readonly accumulateMultiplier: number = 1;

    // unlock ourself, with no level or progress requirements
    protected static override readonly unlockLevel: number = 0;
    protected static override readonly unlockVisibleSublevel: number = 0;
    protected static override readonly unlockEnabledSublevel: number = 0;
}

class ScanFilesModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Files;

    protected static override readonly accumulateMultiplier: number = 2;

    protected static override readonly unlockLevel: number = 1;
}

class ScanHRModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_HR;

    protected static override readonly accumulateMultiplier: number = 3;

    protected static override readonly unlockLevel: number = 2;
}

class ScanSecurityModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Security;

    protected static override readonly accumulateMultiplier: number = 4;

    protected static override readonly unlockLevel: number = 3;
}

class ScanCoreModel extends ScanNodeModel {
    public static override readonly id: CommandId = CommandId.Scan_Core;

    protected static override readonly accumulateMultiplier: number = 5;

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

    public static override update(timeDelta: IDeltaValue, operationId: EntityId): void {
        super.update(timeDelta, operationId);

        const { host } = this.game.getOperation(operationId);
        const model = modelLookup[host];
        model.update(timeDelta, operationId);
    }
}

registerModel(ScanModel);
registerModel(ScanFilesModel);
registerModel(ScanHRModel);
registerModel(ScanHubModel);
registerModel(ScanCoreModel);
registerModel(ScanSecurityModel);
