import { RootState } from '@/App/store';
import { CommandId, CommandTarget } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';
import { InstructionData } from '@/types';

import { ReactComponent as ForkGlyph } from './glyphs/fork.svg';

class ForkDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Fork;

    public readonly name = 'Fork';

    public override readonly targetType: CommandTarget = CommandTarget.Script;
    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return ForkGlyph; }

    protected override createInstructionData(state: RootState): InstructionData {
        const instruction = super.createInstructionData(state);
        instruction.targetEntityId = state.scriptData.currentId;
        return instruction;
    }
}

registerDesign(ForkDesign);
