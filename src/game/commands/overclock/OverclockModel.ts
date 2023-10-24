import { EntityId } from '@reduxjs/toolkit';

import { CommandId, Host, Role } from '@/constants';
import { ModelStatus } from '@/constants/worker';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';

const rolesAllowedByLevel: Record<number, Role[]> = {
    [0]: [Role.Root, Role.Admin, Role.User, Role.Guest, Role.Anon],
    [1]: [Role.Root, Role.Admin, Role.User, Role.Guest],
    [2]: [Role.Root, Role.Admin, Role.User],
    [3]: [Role.Root, Role.Admin],
    [4]: [Role.Root],
    [5]: [],
};

class OverclockOperation extends OperationModel { }

class OverclockModel extends CommandModel {
    public constructor() { super(CommandId.Overclock, OverclockOperation); }

    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Hub;
    protected override readonly unlockLevel: number = 0;
    protected override readonly unlockVisibleSublevel: number = 4;
    protected override readonly unlockEnabledSublevel: number = 5;

    public override finalize(time: number, operationId: EntityId) {
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

registerModel(new OverclockModel());
