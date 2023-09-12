import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId } from '@/constants';
import { assert } from '@/core';
import type { EntityId, InstructionState } from '@/types';
import type { IGameContext, IOperationModel } from '@/types/model';
import { DeltaValue } from '@/worker/client';

class ForkModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Fork;

    private scriptId?: EntityId;
    private subroutineId?: EntityId;
    private startTime = 0;

    public static override synchronize(time: number) {
        super.synchronize(time);

        this.isInLexicon = true;
    }

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ForkModel(parentRoutineId, parentSubroutineId);
    }

    public override async initializeAsync(game: IGameContext, instruction: InstructionState): Promise<void> {
        await super.initializeAsync(game, instruction);

        const { targetEntityId } = instruction;
        assert(targetEntityId, "Command 'Fork' requires its source instruction to define a 'targetEntityId'.");

        this.scriptId = targetEntityId;
    }

    public override start(time: number): void {
        super.start(time);

        this.startTime = time;

        assert(this.scriptId, "ForkModel property 'scriptId' unexpectedly undefined.");
        ForkModel.game.routine.allocateSubroutineAsync(this.scriptId)
            .then(subroutineId => { this.subroutineId = subroutineId; });
    }

    public override synchronize(time: number): void {
        super.synchronize(time);

        if (this.subroutineId === undefined) return;

        const childSubroutine = this.game.getSubroutine(this.subroutineId);

        // children inherit the parent's host and role
        const parentSubroutine = this.game.getSubroutine(this.parentSubroutineId);
        childSubroutine.host = parentSubroutine.host;
        childSubroutine.role = parentSubroutine.role;

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

registerModel(ForkModel);
