import { CommandId } from '@/constants';

import CommandDesign, { registerDesign } from '../_CommandDesign';

class ScanDesign extends CommandDesign {
    public readonly id = CommandId.Scan;
    public readonly name = 'Scan';

    public override isInLexicon(): boolean {
        return true;
    }
}

registerDesign(new ScanDesign());
