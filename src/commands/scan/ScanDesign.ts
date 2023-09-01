import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ScanDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Scan;

    private readonly _subcommands: CommandId[] = [ CommandId.ScanHub, CommandId.ScanFiles ];

    public readonly name = 'Scan';

    public override readonly canBeInstruction = true;

    public override get subcommands() { return this._subcommands; }
}

class ScanFilesDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.ScanFiles;

    public readonly name = 'Scan Files';

    public override readonly shouldShowLevel = true;
}

class ScanHubDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.ScanHub;

    public readonly name = 'Scan Hub';

    public override readonly shouldShowLevel = true;
}

registerDesign(ScanDesign);
registerDesign(ScanFilesDesign);
registerDesign(ScanHubDesign);
