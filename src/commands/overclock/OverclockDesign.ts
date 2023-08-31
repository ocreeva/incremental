import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class OverclockDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Overclock;

    public readonly name = 'Overclock';

    public override readonly canBeInstruction = true;
}

registerDesign(OverclockDesign);
