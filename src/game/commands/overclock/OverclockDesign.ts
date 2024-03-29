import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import { ReactComponent as Overclock0Glyph } from './glyphs/overclock-0.svg';
import { ReactComponent as Overclock1Glyph } from './glyphs/overclock-1.svg';
import { ReactComponent as Overclock2Glyph } from './glyphs/overclock-2.svg';
import { ReactComponent as Overclock3Glyph } from './glyphs/overclock-3.svg';
import { ReactComponent as Overclock4Glyph } from './glyphs/overclock-4.svg';
import { ReactComponent as Overclock5Glyph } from './glyphs/overclock-5.svg';

const GlyphByLevel: Record<number, React.FC> = {
    0: Overclock0Glyph,
    1: Overclock1Glyph,
    2: Overclock2Glyph,
    3: Overclock3Glyph,
    4: Overclock4Glyph,
    5: Overclock5Glyph,
};

class OverclockDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Overclock;

    public readonly name = 'Overclock';

    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;
    public override readonly shouldShowLevel = true;
    public override get shouldShowProgress(): boolean { return false; }

    public override get GlyphComponent() { return GlyphByLevel[this.level]; }
}

registerDesign(OverclockDesign);
