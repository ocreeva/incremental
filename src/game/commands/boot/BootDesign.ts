import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import { ReactComponent as BootGlyph } from './glyphs/boot.svg';

class BootDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Boot;

    public readonly name = 'Boot';

    public override get GlyphComponent() { return BootGlyph; }
}

registerDesign(BootDesign);
