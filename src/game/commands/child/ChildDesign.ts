import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import { ReactComponent as ChildGlyph } from './glyphs/child.svg';

class ChildDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Child;

    public readonly name = 'Child';

    public override get GlyphComponent() { return ChildGlyph; }
}

registerDesign(ChildDesign);
