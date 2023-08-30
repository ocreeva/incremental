import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ChildDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Child;

    public readonly name = 'Child';
}

registerDesign(ChildDesign);
