import { ReactComponent as LoginGlyph } from '@/assets/glyphs/login.svg';
import { ReactComponent as LoginHubGlyph } from '@/assets/glyphs/login-hub.svg';
import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import LoginCoreGlyph from './glyphs/LoginCoreGlyph';
import LoginFilesGlyph from './glyphs/LoginFilesGlyph';
import LoginHRGlyph from './glyphs/LoginHRGlyph';
import LoginSecurityGlyph from './glyphs/LoginSecurityGlyph';

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

    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return LoginGlyph; }

    public override get subcommands() { return this._subcommands; }
}

abstract class LoginNodeDesign extends CommandDesign {
    public override readonly canBeInstruction = true;
}

class LoginFilesDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Files;

    public readonly name = 'Login to Files';

    public override get GlyphComponent() { return LoginFilesGlyph; }
}

class LoginHRDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_HR;

    public readonly name = 'Login to HR';

    public override get GlyphComponent() { return LoginHRGlyph; }
}

class LoginSecurityDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Security;

    public readonly name = 'Login to Security';

    public override get GlyphComponent() { return LoginSecurityGlyph; }
}

class LoginCoreDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Core;

    public readonly name = 'Login to Root';

    public override get GlyphComponent() { return LoginCoreGlyph; }
}

class LoginHubDesign extends LoginNodeDesign {
    public static override readonly id: CommandId = CommandId.Login_Hub;

    public readonly name = 'Return to Hub';

    public override get GlyphComponent() { return LoginHubGlyph; }
}

registerDesign(LoginDesign);
registerDesign(LoginFilesDesign);
registerDesign(LoginHRDesign);
registerDesign(LoginSecurityDesign);
registerDesign(LoginCoreDesign);
registerDesign(LoginHubDesign);
