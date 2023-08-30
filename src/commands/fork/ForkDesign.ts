import { type RootState } from '@/App/store';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandAsInstruction, CommandId } from '@/constants';
import type { InstructionState } from '@/types';

class ForkDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Fork;

    public readonly name = 'Fork';

    public override readonly asInstruction: CommandAsInstruction = CommandAsInstruction.TargetScript;
    public override readonly canBeInstruction = true;

    public override isInLexicon(): boolean {
        return true;
    }

    protected override _createInstruction(state: RootState): InstructionState {
        const instruction = super._createInstruction(state);
        instruction.targetEntityId = state.scripts.currentId;
        return instruction;
    }
}

registerDesign(ForkDesign);
