import { CommandId, Role } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

class ElevateModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Elevate;

    protected static override readonly unlockCommandId?: CommandId = CommandId.Scan_Hub;
    protected static override readonly unlockLevel: number = 0;

    public override finalize(time: number): void {
        super.finalize(time);

        const subroutine = this.game.getSubroutine(this.parentSubroutineId);
        switch (subroutine.role) {
            case Role.Anon:
                subroutine.role = Role.Guest;
                break;

            case Role.Guest:
                subroutine.role = Role.User;
                break;

            case Role.User:
                subroutine.role = Role.Admin;
                break;

            case Role.Admin:
                subroutine.role = Role.Root;
                break;

            case Role.Root:
                break;

            default:
                throw Error(`Unhandled role '${subroutine.role}' on subroutine (${subroutine.id}).`);
        }
    }

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ElevateModel(parentRoutineId, parentSubroutineId);
    }
}

registerModel(ElevateModel);
