import { CommandId } from '@/constants';
import type { CommandState, GameModel } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import LoginModel from './LoginModel';

class LoginData extends CommandData {
    public readonly id = CommandId.Login;

    public override createModel(): GameModel<CommandState> {
        return new LoginModel();
    }
}

registerData(new LoginData());
