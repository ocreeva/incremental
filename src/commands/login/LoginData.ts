import { CommandId } from '@/constants';
import type { GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import LoginModel from './LoginModel';

class LoginData extends CommandData {
    public readonly id = CommandId.Login;

    public override createModel(_instruction: InstructionState): GameModel<OperationState> {
        return new LoginModel();
    }
}

registerData(new LoginData());
