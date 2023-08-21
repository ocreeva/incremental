import { CommandId } from '@/constants';
import type { EntityId, GameModel, InstructionState, OperationState } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import LoginModel from './LoginModel';

class LoginData extends CommandData {
    public readonly id = CommandId.Login;

    public override createModel(_instruction: InstructionState, parentRoutineId: EntityId, parentSubroutineId: EntityId): GameModel<OperationState> {
        return new LoginModel(parentRoutineId, parentSubroutineId);
    }
}

registerData(new LoginData());
