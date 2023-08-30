import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ScanDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Scan;

    private readonly _subcommands: CommandId[] = [ CommandId.ScanHub ];

    public readonly name = 'Scan';

    public override readonly canBeInstruction = true;

    public override get subcommands() { return this._subcommands; }

    public override isInLexicon(): boolean {
        return true;
    }
}

class ScanHubDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.ScanHub;

    public readonly name = 'Scan Hub';

    public override readonly shouldShowProgress = true;
}

registerDesign(ScanDesign);
registerDesign(ScanHubDesign);
