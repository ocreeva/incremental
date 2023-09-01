import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class OverclockDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Overclock;

    public readonly name = 'Overclock';

    public override readonly canBeInstruction = true;
    public override readonly shouldShowLevel = true;
    public override get shouldShowProgress(): boolean { return false; }

    public override get glyphPath() { return `${this.id}-${this.level}`; }
}

registerDesign(OverclockDesign);
