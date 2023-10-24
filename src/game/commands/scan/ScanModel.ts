import { EntityId } from '@reduxjs/toolkit';

import { CommandId, Host } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';
import { ICommandModel, IDeltaValue } from '@/types/model';

abstract class ScanNodeModel extends CommandModel {
    protected constructor(id: CommandId) { super(id); }

    protected override readonly shouldAccumulateTime: boolean = true;

    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
}

class ScanHubModel extends ScanNodeModel {
    public constructor() { super(CommandId.Scan_Hub); }

    protected override readonly accumulateMultiplier: number = 1;

    // unlock ourself, with no level or progress requirements
    protected override readonly unlockLevel: number = 0;
    protected override readonly unlockVisibleSublevel: number = 0;
    protected override readonly unlockEnabledSublevel: number = 0;
}

class ScanFilesModel extends ScanNodeModel {
    public constructor() { super(CommandId.Scan_Files); }

    protected override readonly accumulateMultiplier: number = 2;

    protected override readonly unlockLevel: number = 1;
}

class ScanHRModel extends ScanNodeModel {
    public constructor() { super(CommandId.Scan_HR); }

    protected override readonly accumulateMultiplier: number = 3;

    protected override readonly unlockLevel: number = 2;
}

class ScanSecurityModel extends ScanNodeModel {
    public constructor() { super(CommandId.Scan_Security); }

    protected override readonly accumulateMultiplier: number = 4;

    protected override readonly unlockLevel: number = 3;
}

class ScanCoreModel extends ScanNodeModel {
    public constructor() { super(CommandId.Scan_Core); }

    protected override readonly accumulateMultiplier: number = 5;

    protected override readonly unlockLevel: number = 4;
}

const modelLookup: Record<Host, ICommandModel> = {
    [Host.Hub]: new ScanHubModel(),
    [Host.Files]: new ScanFilesModel(),
    [Host.HR]: new ScanHRModel(),
    [Host.Security]: new ScanSecurityModel(),
    [Host.Core]: new ScanCoreModel(),
};

class ScanOperation extends OperationModel { }

class ScanModel extends CommandModel {
    public constructor() { super(CommandId.Scan, ScanOperation); }

    // unlock ourself, with no level or progress requirements
    protected override readonly unlockCommandId: CommandId = CommandId.Scan;
    protected override readonly unlockLevel: number = 0;
    protected override readonly unlockVisibleSublevel: number = 0;
    protected override readonly unlockEnabledSublevel: number = 0;

    public override update(timeDelta: IDeltaValue, operationId: EntityId): void {
        super.update(timeDelta, operationId);

        const { host } = this.game.getOperation(operationId);
        const model = modelLookup[host];
        model.update(timeDelta, operationId);
    }
}

registerModel(new ScanModel());
registerModel(modelLookup[Host.Hub]);
registerModel(modelLookup[Host.Files]);
registerModel(modelLookup[Host.HR]);
registerModel(modelLookup[Host.Security]);
registerModel(modelLookup[Host.Core]);
