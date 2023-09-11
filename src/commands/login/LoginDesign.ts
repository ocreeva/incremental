import { RootState } from '@/App/store';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId, CommandTarget, Host } from '@/constants';
import type { InstructionState } from '@/types';

class LoginDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Login;

    private readonly _subcommands: CommandId[] = [
        CommandId.Login_Hub,
        CommandId.Login_Files,
        CommandId.Login_HR,
        CommandId.Login_Security,
        CommandId.Login_Root,
    ];

    public readonly name = 'Login';

    public override readonly canBeInstruction = true;
    public override readonly targetType: CommandTarget = CommandTarget.Host;

    public override get subcommands() { return this._subcommands; }

    protected override createInstructionState(state: RootState): InstructionState {
        const instruction = super.createInstructionState(state);
        instruction.targetEntityId = Host.Files;
        return instruction;
    }
}

abstract class LoginNodeDesign extends CommandDesign { }

class LoginFilesDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Files;

    public readonly name = 'Login to Files';
}

class LoginHRDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_HR;

    public readonly name = 'Login to HR';
}

class LoginHubDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Hub;

    public readonly name = 'Return to Hub';
}

class LoginRootDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Root;

    public readonly name = 'Login to Root';
}

class LoginSecurityDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Security;

    public readonly name = 'Login to Security';
}

registerDesign(LoginDesign);
registerDesign(LoginFilesDesign);
registerDesign(LoginHRDesign);
registerDesign(LoginHubDesign);
registerDesign(LoginRootDesign);
registerDesign(LoginSecurityDesign);
