import { CommandId, Host } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { ICommandModel, IDeltaValue, IOperationModel } from '@/types/model';

abstract class IndexNodeModel extends CommandModel {
    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;

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

class IndexHubModel extends IndexNodeModel {
    public static override readonly id: CommandId = CommandId.Index_Hub;

    // unlock ourself, with no level or progress requirements
    protected static override readonly unlockLevel: number = 0;
    protected static override readonly unlockVisibleSublevel: number = 0;
    protected static override readonly unlockEnabledSublevel: number = 0;
}

class IndexFilesModel extends IndexNodeModel {
    public static override readonly id: CommandId = CommandId.Index_Files;

    protected static override readonly unlockLevel: number = 1;
}

class IndexHRModel extends IndexNodeModel {
    public static override readonly id: CommandId = CommandId.Index_HR;

    protected static override readonly unlockLevel: number = 2;
}

class IndexSecurityModel extends IndexNodeModel {
    public static override readonly id: CommandId = CommandId.Index_Security;

    protected static override readonly unlockLevel: number = 3;
}

class IndexCoreModel extends IndexNodeModel {
    public static override readonly id: CommandId = CommandId.Index_Core;

    protected static override readonly unlockLevel: number = 4;
}

const modelLookup: Record<Host, ICommandModel> = {
    [Host.Hub]: IndexHubModel,
    [Host.Files]: IndexFilesModel,
    [Host.HR]: IndexHRModel,
    [Host.Security]: IndexSecurityModel,
    [Host.Core]: IndexCoreModel,
};

class IndexModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Index;

    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Files;
    protected static override readonly unlockLevel: number = 0;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new IndexModel(parentRoutineId, parentSubroutineId);
    }

    public static override update(completion: IDeltaValue, operationId: EntityId, time: number): void {
        super.update(completion, operationId, time);

        const { parentSubroutineId } = this.game.getOperation(operationId);
        const { host } = this.game.getSubroutine(parentSubroutineId);
        const model = modelLookup[host];
        model.update(completion, operationId, time);
    }
}

registerModel(IndexModel);
registerModel(IndexFilesModel);
registerModel(IndexHRModel);
registerModel(IndexHubModel);
registerModel(IndexCoreModel);
registerModel(IndexSecurityModel);
