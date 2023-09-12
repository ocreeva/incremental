import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId, Host } from '@/constants';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class LoginModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Login;

    public static override synchronize(time: number) {
        super.synchronize(time);

        this.isInLexicon = true;
    }
}

abstract class LoginNodeModel extends CommandModel {
    public abstract host: Host;

    public override finalize(_time: number): void {
        const subroutine = this.game.getSubroutine(this.parentSubroutineId);
        subroutine.host = this.host;
    }
}

class LoginFilesModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Files;

    public override host: Host = Host.Files;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginFilesModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginHRModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_HR;

    public override host: Host = Host.HR;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginHRModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginSecurityModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Security;

    public override host: Host = Host.Security;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginSecurityModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginCoreModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Core;

    public override host: Host = Host.Core;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginCoreModel(parentRoutineId, parentSubroutineId);
    }
}

class LoginHubModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Hub;

    public override host: Host = Host.Hub;

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
