import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId } from '@/constants';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class LoginModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Login;

    public static override synchronize(time: number) {
        super.synchronize(time);

        this.isInLexicon = true;
    }

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginModel(parentRoutineId, parentSubroutineId);
    }
}

abstract class LoginNodeModel extends CommandModel { }

class LoginFilesModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Files;
}

class LoginHRModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_HR;
}

class LoginHubModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Hub;
}

class LoginRootModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Root;
}

class LoginSecurityModel extends LoginNodeModel {
    public static override readonly id: CommandId = CommandId.Login_Security;
}

registerModel(LoginModel);
registerModel(LoginFilesModel);
registerModel(LoginHRModel);
registerModel(LoginHubModel);
registerModel(LoginRootModel);
registerModel(LoginSecurityModel);
