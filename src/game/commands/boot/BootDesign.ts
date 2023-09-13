import { ReactComponent as BootGlyph } from '@/assets/glyphs/boot.svg';
import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

class BootDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Boot;

    public readonly name = 'Boot';

    public override get GlyphComponent() { return BootGlyph; }
}

registerDesign(BootDesign);
