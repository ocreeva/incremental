import { EntityId } from '@reduxjs/toolkit';

import { CommandId, Host } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';
import { ICommandModel, IDeltaValue } from '@/types/model';

abstract class IndexNodeModel extends CommandModel {
    protected constructor(id: CommandId) { super(id); }

    protected override readonly shouldAccumulateTime: boolean = true;

    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
}

class IndexHubModel extends IndexNodeModel {
    public constructor() { super(CommandId.Index_Hub); }

    protected override readonly accumulateMultiplier: number = 2;

    // unlock ourself, with no level or progress requirements
    protected override readonly unlockLevel: number = 0;
    protected override readonly unlockVisibleSublevel: number = 0;
    protected override readonly unlockEnabledSublevel: number = 0;
}

class IndexFilesModel extends IndexNodeModel {
    public constructor() { super(CommandId.Index_Files); }

    protected override readonly accumulateMultiplier: number = 4;

    protected override readonly unlockLevel: number = 1;
}

class IndexHRModel extends IndexNodeModel {
    public constructor() { super(CommandId.Index_HR); }

    protected override readonly accumulateMultiplier: number = 6;

    protected override readonly unlockLevel: number = 2;
}

class IndexSecurityModel extends IndexNodeModel {
    public constructor() { super(CommandId.Index_Security); }

    protected override readonly accumulateMultiplier: number = 8;

    protected override readonly unlockLevel: number = 3;
}

class IndexCoreModel extends IndexNodeModel {
    public constructor() { super(CommandId.Index_Core); }

    protected override readonly accumulateMultiplier: number = 10;

    protected override readonly unlockLevel: number = 4;
}

const modelLookup: Record<Host, ICommandModel> = {
    [Host.Hub]: new IndexHubModel(),
    [Host.Files]: new IndexFilesModel(),
    [Host.HR]: new IndexHRModel(),
    [Host.Security]: new IndexSecurityModel(),
    [Host.Core]: new IndexCoreModel(),
};

class IndexOperation extends OperationModel { }

class IndexModel extends CommandModel {
    public constructor() { super(CommandId.Index, IndexOperation); }

    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Files;
    protected override readonly unlockLevel: number = 0;

    public override update(timeDelta: IDeltaValue, operationId: EntityId): void {
        super.update(timeDelta, operationId);

        const { host } = this.game.getOperation(operationId);
        const model = modelLookup[host];
        model.update(timeDelta, operationId);
    }
}

registerModel(new IndexModel());
registerModel(modelLookup[Host.Hub]);
registerModel(modelLookup[Host.Files]);
registerModel(modelLookup[Host.HR]);
registerModel(modelLookup[Host.Security]);
registerModel(modelLookup[Host.Core]);
