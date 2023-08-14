import { CommandId } from '@/constants';

import CommandDesign, { registerDesign } from '../_CommandDesign';

class LoginDesign extends CommandDesign {
    public readonly id = CommandId.Login;
    public readonly name = 'Login';

    public override readonly canBeInstruction = true;

    public override isInLexicon(): boolean {
        return true;
    }
}

registerDesign(new LoginDesign());
