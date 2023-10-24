import { CommandId, Role } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';

class ElevateOperation extends OperationModel {
    public override finalize(time: number): void {
        super.finalize(time);

        const subroutine = this.game.getSubroutine(this.parentSubroutineId);
        switch (this.role) {
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
}

class ElevateModel extends CommandModel {
    public constructor() { super(CommandId.Elevate, ElevateOperation); }

    protected override readonly unlockCommandId?: CommandId = CommandId.Scan_Hub;
    protected override readonly unlockLevel: number = 0;
}

registerModel(new ElevateModel());
