import { CommandId, type Host, Role } from '@/constants';
import { ModelStatus } from '@/constants/worker';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import type { EntityId } from '@/types';
import type { IOperationModel } from '@/types/model';

const rolesAllowedByLevel: Record<number, Role[]> = {
    [0]: [Role.Root, Role.Admin, Role.User, Role.Guest, Role.Anon],
    [1]: [Role.Root, Role.Admin, Role.User, Role.Guest],
    [2]: [Role.Root, Role.Admin, Role.User],
    [3]: [Role.Root, Role.Admin],
    [4]: [Role.Root],
    [5]: [],
};

class OverclockModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Overclock;

    protected static override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
    protected static override readonly unlockLevel: number = 0;
    protected static override readonly unlockVisibleSublevel: number = 4;
    protected static override readonly unlockEnabledSublevel: number = 5;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new OverclockModel(parentRoutineId, parentSubroutineId);
    }

    public static override finalize(time: number, operationId: EntityId) {
        super.finalize(time, operationId);

        // count the number of successful Overclock operations in distinct hosts
        const hosts: Host[] = [];
        const rolesAllowed = rolesAllowedByLevel[this.level];
        this.game.operations.forEach((operation) => {
            if (operation.commandId !== CommandId.Overclock) return;
            if ((operation.status !== ModelStatus.final) && (operation.status !== ModelStatus.complete)) return;
            if (!rolesAllowed.includes(operation.role)) return;
            if (hosts.includes(operation.host)) return;
            hosts.push(operation.host);
        });

        if (hosts.length <= this.level) return;

        this.level++;
    }
}

registerModel(OverclockModel);
