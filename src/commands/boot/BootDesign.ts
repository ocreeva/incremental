import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class BootDesign extends CommandDesign {
    public readonly id = CommandId.Boot;
    public readonly name = 'Boot';
}

registerDesign(new BootDesign());
