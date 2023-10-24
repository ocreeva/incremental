import { CommandId, Host } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';

class LoginModel extends CommandModel {
    public constructor() { super(CommandId.Login); }

    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
    protected override readonly unlockLevel: number = 1;
}

abstract class LoginNodeModel extends CommandModel {
    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;

    public abstract readonly destination: Host;
}

class LoginOperation extends OperationModel<LoginNodeModel> {
    public override finalize(time: number): void {
        super.finalize(time);

        const subroutine = this.game.getSubroutine(this.parentSubroutineId);
        subroutine.host = this.command.destination;
    }
}

class LoginFilesModel extends LoginNodeModel {
    public constructor() { super(CommandId.Login_Files, LoginOperation); }

    protected override readonly unlockLevel: number = 1;

    public override readonly destination: Host = Host.Files;
}

class LoginHRModel extends LoginNodeModel {
    public constructor() { super(CommandId.Login_HR, LoginOperation); }

    protected override readonly unlockLevel: number = 2;

    public override readonly destination: Host = Host.HR;
}

class LoginSecurityModel extends LoginNodeModel {
    public constructor() { super(CommandId.Login_Security, LoginOperation); }

    protected override readonly unlockLevel: number = 3;

    public override readonly destination: Host = Host.Security;
}

class LoginCoreModel extends LoginNodeModel {
    public constructor() { super(CommandId.Login_Core, LoginOperation); }

    protected override readonly unlockLevel: number = 4;

    public override readonly destination: Host = Host.Core;
}

class LoginHubModel extends LoginNodeModel {
    public constructor() { super(CommandId.Login_Hub, LoginOperation); }

    protected override readonly unlockLevel: number = 1;

    public override readonly destination: Host = Host.Hub;
}

registerModel(new LoginModel());
registerModel(new LoginFilesModel());
registerModel(new LoginHRModel());
registerModel(new LoginSecurityModel());
registerModel(new LoginCoreModel());
registerModel(new LoginHubModel());
