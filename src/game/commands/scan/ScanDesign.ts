import { CommandId } from '@/constants';
import CommandDesign, { registerDesign } from '@/game/commands/_/CommandDesign';

import { ReactComponent as ScanGlyph } from './glyphs/scan.svg';
import { ReactComponent as ScanFilesGlyph } from './glyphs/scan-files.svg';
import { ReactComponent as ScanHRGlyph } from './glyphs/scan-hr.svg';
import { ReactComponent as ScanSecurityGlyph } from './glyphs/scan-security.svg';
import { ReactComponent as ScanCoreGlyph } from './glyphs/scan-core.svg';
import { ReactComponent as ScanHubGlyph } from './glyphs/scan-hub.svg';

class ScanDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Scan;

    private readonly _subcommands: CommandId[] = [
        CommandId.Scan_Hub,
        CommandId.Scan_Files,
        CommandId.Scan_HR,
        CommandId.Scan_Security,
        CommandId.Scan_Core,
    ];

    public readonly name = 'Scan';

    public override readonly canBeInstruction = true;
    public override readonly isInLexicon: boolean = true;

    public override get GlyphComponent() { return ScanGlyph; }

    public override get subcommands() { return this._subcommands; }
}

abstract class ScanNodeDesign extends CommandDesign {
    public override readonly shouldShowLevel = true;
}

class ScanHubDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Hub;

    public readonly name = 'Scan Hub';

    public override get GlyphComponent() { return ScanHubGlyph; }
}

class ScanFilesDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Files;

    public readonly name = 'Scan Files';

    public override get GlyphComponent() { return ScanFilesGlyph; }
}

class ScanHRDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_HR;

    public readonly name = 'Scan HR';

    public override get GlyphComponent() { return ScanHRGlyph; }
}

class ScanSecurityDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Security;

    public readonly name = 'Scan Security';

    public override get GlyphComponent() { return ScanSecurityGlyph; }
}

class ScanCoreDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Core;

    public readonly name = 'Scan Root';

    public override get GlyphComponent() { return ScanCoreGlyph; }
}

registerDesign(ScanDesign);
registerDesign(ScanHubDesign);
registerDesign(ScanFilesDesign);
registerDesign(ScanHRDesign);
registerDesign(ScanSecurityDesign);
registerDesign(ScanCoreDesign);
