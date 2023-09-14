import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import { ReactComponent as ElevateGlyph } from './glyphs/elevate.svg';

class ElevateDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Elevate;

    public readonly name = 'Elevate';

    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return ElevateGlyph; }
}

registerDesign(ElevateDesign);
