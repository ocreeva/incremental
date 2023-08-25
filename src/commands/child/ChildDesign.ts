import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class ChildDesign extends CommandDesign {
    public readonly id = CommandId.Child;
    public readonly name = 'Child';
}

registerDesign(new ChildDesign());
