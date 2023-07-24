import { CommandId } from '@/constants';

import CommandModel from '../CommandModel';

class LoginModel extends CommandModel {
    constructor() {
        super(CommandId.Login);
    }
}

export default LoginModel;
