import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class LoginDesign extends CommandDesign {
    public readonly id = CommandId.Login;
    public readonly name = 'Login';

    public override readonly canBeInstruction = true;

    public override isInLexicon(): boolean {
        return true;
    }
}

registerDesign(new LoginDesign());
