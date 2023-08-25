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

        const subroutine = ForkModel.game.getSubroutine(this.subroutineId);
        subroutine.start(this.startTime);

        const timeDelta = new DeltaValue(this.startTime, time - this.startTime);
        subroutine.update(timeDelta);

        this.subroutineId = undefined;
    }
}

registerModel(ForkModel);
