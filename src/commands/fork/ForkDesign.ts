import { type RootState } from '@/App/store';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId, CommandTarget } from '@/constants';
import type { InstructionState } from '@/types';

class ForkDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Fork;

    public readonly name = 'Fork';

    public override readonly targetType: CommandTarget = CommandTarget.Script;
    public override readonly canBeInstruction = true;

    protected override createInstructionState(state: RootState): InstructionState {
        const instruction = super.createInstructionState(state);
        instruction.targetEntityId = state.scripts.currentId;
        return instruction;
    }
}

registerDesign(ForkDesign);
