import { ReactComponent as BootGlyph } from '@/assets/glyphs/boot.svg';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class BootDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Boot;

    public readonly name = 'Boot';

    public override get GlyphComponent() { return BootGlyph; }
}

registerDesign(BootDesign);
