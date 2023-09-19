import { CommandId, Host } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class LoginModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Login;

    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
    protected static override readonly unlockLevel: number = 1;
}

abstract class LoginNodeModel extends CommandModel {
    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;

    public abstract readonly destination: Host;

    public override finalize(time: number): void {
        super.finalize(time);

        const subroutine = this.game.getSubroutine(this.parentSubroutineId);
        subroutine.host = this.destination;
    }
}

class LoginFilesModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Files;

    protected static override readonly unlockLevel: number = 1;

    public override readonly destination: Host = Host.Files;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginFilesModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginHRModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_HR;

    protected static override readonly unlockLevel: number = 2;

    public override readonly destination: Host = Host.HR;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginHRModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginSecurityModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Security;

    protected static override readonly unlockLevel: number = 3;

    public override readonly destination: Host = Host.Security;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginSecurityModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginCoreModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Core;

    protected static override readonly unlockLevel: number = 4;

    public override readonly destination: Host = Host.Core;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginCoreModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginHubModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Hub;

    protected static override readonly unlockLevel: number = 1;

    public override readonly destination: Host = Host.Hub;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginHubModel(parentRoutineId, parentSubroutineId);
    }
}

registerModel(LoginModel);
registerModel(LoginFilesModel);
registerModel(LoginHRModel);
registerModel(LoginSecurityModel);
registerModel(LoginCoreModel);
registerModel(LoginHubModel);
