import { EntityId } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { assert } from '@/core';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';
import { InstructionData } from '@/types';
import { IGameContext } from '@/types/model';
import { DeltaValue } from '@/worker/client';

class ForkOperation extends OperationModel {
    private scriptId?: EntityId;
    private subroutineId?: EntityId;
    private startTime = 0;

    public override async initializeAsync(game: IGameContext, instruction: InstructionData): Promise<void> {
        await super.initializeAsync(game, instruction);

        const { targetEntityId } = instruction;
        assert(targetEntityId, "Command 'Fork' requires its source instruction to define a 'targetEntityId'.");

        this.scriptId = targetEntityId;
    }

    public override start(time: number): void {
        super.start(time);

        this.startTime = time;

        assert(this.scriptId, "ForkModel property 'scriptId' unexpectedly undefined.");
        this.game.routine.allocateSubroutineAsync(this.scriptId)
            .then(subroutineId => { this.subroutineId = subroutineId; });
    }

    public override synchronize(time: number): void {
        super.synchronize(time);

        if (this.subroutineId === undefined) return;

        const childSubroutine = this.game.getSubroutine(this.subroutineId);

        // children inherit the source's host and role
        childSubroutine.host = this.host;
        childSubroutine.role = this.role;

        childSubroutine.start(this.startTime);
        this.game.routine.duration = Math.max(this.game.routine.duration, childSubroutine.duration);

        const timeDelta = new DeltaValue(this.startTime, time - this.startTime);
        childSubroutine.update(timeDelta);

        // put the subroutine in the routine's collection, if necessary
        if (!this.game.routine.subroutines.includes(this.subroutineId)) {
            this.game.routine.subroutines.push(this.subroutineId);
            this.game.synchronization.updateRoutine({ subroutines: this.game.routine.subroutines });
        }

        this.subroutineId = undefined;
    }
}

class ForkModel extends CommandModel {
    public constructor() { super(CommandId.Fork, ForkOperation); }

    protected override readonly unlockCommandId: CommandId = CommandId.Scan_Files;
    protected override readonly unlockLevel: number = 1;
}

registerModel(new ForkModel());
