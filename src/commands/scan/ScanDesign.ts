import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ScanDesign extends CommandDesign {
    private readonly _subcommands: CommandId[] = [ CommandId.ScanHub ];

    public readonly id = CommandId.Scan;
    public readonly name = 'Scan';

    public override readonly canBeInstruction = true;

    public override get subcommands() { return this._subcommands; }

    public override isInLexicon(): boolean {
        return true;
    }
}

class ScanHubDesign extends CommandDesign {
    public readonly id = CommandId.ScanHub;
    public readonly name = 'Scan Hub';

    public override readonly shouldShowProgress = true;
}

registerDesign(new ScanDesign());
registerDesign(new ScanHubDesign());
