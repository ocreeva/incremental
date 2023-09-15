import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import { ReactComponent as IndexGlyph } from './glyphs/index.svg';
import { ReactComponent as IndexFilesGlyph } from './glyphs/index-files.svg';
import { ReactComponent as IndexHRGlyph } from './glyphs/index-hr.svg';
import { ReactComponent as IndexSecurityGlyph } from './glyphs/index-security.svg';
import { ReactComponent as IndexCoreGlyph } from './glyphs/index-core.svg';
import { ReactComponent as IndexHubGlyph } from './glyphs/index-hub.svg';

class IndexDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Index;

    private readonly _subcommands: CommandId[] = [
        CommandId.Index_Hub,
        CommandId.Index_Files,
        CommandId.Index_HR,
        CommandId.Index_Security,
        CommandId.Index_Core,
    ];

    public readonly name = 'Index';

    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return IndexGlyph; }

    public override get subcommands() { return this._subcommands; }
}

abstract class IndexNodeDesign extends CommandDesign {
    public override readonly shouldShowLevel = true;
}

class IndexHubDesign extends IndexNodeDesign {
    public static override readonly id: CommandId = CommandId.Index_Hub;

    public readonly name = 'Index Hub';

    public override get GlyphComponent() { return IndexHubGlyph; }
}

class IndexFilesDesign extends IndexNodeDesign {
    public static override readonly id: CommandId = CommandId.Index_Files;

    public readonly name = 'Index Files';

    public override get GlyphComponent() { return IndexFilesGlyph; }
}

class IndexHRDesign extends IndexNodeDesign {
    public static override readonly id: CommandId = CommandId.Index_HR;

    public readonly name = 'Index HR';

    public override get GlyphComponent() { return IndexHRGlyph; }
}

class IndexSecurityDesign extends IndexNodeDesign {
    public static override readonly id: CommandId = CommandId.Index_Security;

    public readonly name = 'Index Security';

    public override get GlyphComponent() { return IndexSecurityGlyph; }
}

class IndexCoreDesign extends IndexNodeDesign {
    public static override readonly id: CommandId = CommandId.Index_Core;

    public readonly name = 'Index Root';

    public override get GlyphComponent() { return IndexCoreGlyph; }
}

registerDesign(IndexDesign);
registerDesign(IndexHubDesign);
registerDesign(IndexFilesDesign);
registerDesign(IndexHRDesign);
registerDesign(IndexSecurityDesign);
registerDesign(IndexCoreDesign);
