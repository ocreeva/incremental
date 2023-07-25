import { CommandId } from '@/constants';

import CommandDesign, { registerDesign } from '../_CommandDesign';

class ChildDesign extends CommandDesign {
    public readonly id = CommandId.Child;
    public readonly name = 'Child';
}

registerDesign(new ChildDesign());
