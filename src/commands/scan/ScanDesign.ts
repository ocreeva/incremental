import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ScanDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Scan;

    private readonly _subcommands: CommandId[] = [
        CommandId.Scan_Hub,
        CommandId.Scan_Files,
        CommandId.Scan_HR,
        CommandId.Scan_Security,
        CommandId.Scan_Root,
    ];

    public readonly name = 'Scan';

    public override readonly canBeInstruction = true;

    public override get subcommands() { return this._subcommands; }
}

abstract class ScanNodeDesign extends CommandDesign {
    public override readonly shouldShowLevel = true;
}

class ScanFilesDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Files;

    public readonly name = 'Scan Files';
}

class ScanHRDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_HR;

    public readonly name = 'Scan HR';
}

class ScanHubDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Hub;

    public readonly name = 'Scan Hub';
}

class ScanRootDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Root;

    public readonly name = 'Scan Root';
}

class ScanSecurityDesign extends ScanNodeDesign {
    public static override readonly id: CommandId = CommandId.Scan_Security;

    public readonly name = 'Scan Security';
}

registerDesign(ScanDesign);
registerDesign(ScanFilesDesign);
registerDesign(ScanHRDesign);
registerDesign(ScanHubDesign);
registerDesign(ScanRootDesign);
registerDesign(ScanSecurityDesign);
