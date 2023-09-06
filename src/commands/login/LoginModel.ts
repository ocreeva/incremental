import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId } from '@/constants';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class LoginModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Login;

    public static override synchronize(time: number) {
        super.synchronize(time);

        this.isInLexicon = true;
    }

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new LoginModel(parentRoutineId, parentSubroutineId);
    }
}

registerModel(LoginModel);
