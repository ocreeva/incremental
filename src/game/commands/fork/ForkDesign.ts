import { ReactComponent as ForkGlyph } from '@/assets/glyphs/fork.svg';
import { type RootState } from '@/App/store';
import { CommandId, CommandTarget } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';
import type { InstructionState } from '@/types';

class ForkDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Fork;

    public readonly name = 'Fork';

    public override readonly targetType: CommandTarget = CommandTarget.Script;
    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return ForkGlyph; }

    protected override createInstructionState(state: RootState): InstructionState {
        const instruction = super.createInstructionState(state);
        instruction.targetEntityId = state.scripts.currentId;
        return instruction;
    }
}

registerDesign(ForkDesign);
