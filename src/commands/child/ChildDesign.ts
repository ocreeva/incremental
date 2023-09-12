import { ReactComponent as ChildGlyph } from '@/assets/glyphs/child.svg';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ChildDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Child;

    public readonly name = 'Child';

    public override get GlyphComponent() { return ChildGlyph; }
}

registerDesign(ChildDesign);
