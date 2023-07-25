import { CommandId } from '@/constants';

import CommandDesign, { registerDesign } from '../_CommandDesign';

class BootDesign extends CommandDesign {
    public readonly id = CommandId.Boot;
    public readonly name = 'Boot';
}

registerDesign(new BootDesign());
