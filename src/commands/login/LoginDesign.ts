import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class LoginDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Login;

    private readonly _subcommands: CommandId[] = [
        CommandId.Login_Files,
        CommandId.Login_HR,
        CommandId.Login_Security,
        CommandId.Login_Core,
        CommandId.Login_Hub,
    ];

    public readonly name = 'Login';

    public override get subcommands() { return this._subcommands; }
}

abstract class LoginNodeDesign extends CommandDesign {
    public override readonly canBeInstruction = true;
}

class LoginFilesDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Files;

    public readonly name = 'Login to Files';
}

class LoginHRDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_HR;

    public readonly name = 'Login to HR';
}

class LoginSecurityDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Security;

    public readonly name = 'Login to Security';
}

class LoginRootDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Core;

    public readonly name = 'Login to Root';
}

class LoginHubDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Hub;

    public readonly name = 'Return to Hub';
}

registerDesign(LoginDesign);
registerDesign(LoginFilesDesign);
registerDesign(LoginHRDesign);
registerDesign(LoginSecurityDesign);
registerDesign(LoginRootDesign);
registerDesign(LoginHubDesign);
