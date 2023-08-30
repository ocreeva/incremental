import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId } from '@/constants';

class BootDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Boot;

    public readonly name = 'Boot';
}

registerDesign(BootDesign);
