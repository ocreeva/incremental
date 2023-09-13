import { ReactComponent as ElevateGlyph } from '@/assets/glyphs/elevate.svg';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ElevateDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Elevate;

    public readonly name = 'Elevate';

    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return ElevateGlyph; }
}

registerDesign(ElevateDesign);
