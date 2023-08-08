import { CommandId } from '@/constants';
import type { EntityId } from '@/types';

import CommandModel from '../CommandModel';

class LoginModel extends CommandModel {
    constructor(parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        super(CommandId.Login, parentRoutineId, parentSubroutineId);
    }
}

export default LoginModel;
