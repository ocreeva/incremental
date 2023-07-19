import { CommandId } from '@/commands';

import _CommandDesignBase from './_CommandDesignBase';
import _registerDesign from './_registerDesign';

class LoginDesign extends _CommandDesignBase {
    public readonly id = CommandId.Login;
    public readonly name = 'Login';
}

_registerDesign(new LoginDesign());
