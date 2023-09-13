import { ReactComponent as ChildGlyph } from '@/assets/glyphs/child.svg';
import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

class ChildDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Child;

    public readonly name = 'Child';

    public override get GlyphComponent() { return ChildGlyph; }
}

registerDesign(ChildDesign);
