import { CommandId } from '@/constants';

import CommandDesign, { registerDesign } from '../_CommandDesign';

class LoginDesign extends CommandDesign {
    public readonly id = CommandId.Login;
    public readonly name = 'Login';
}

registerDesign(new LoginDesign());
