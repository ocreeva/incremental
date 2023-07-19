import { CommandId } from '@/commands';

import _CommandDesignBase from './_CommandDesignBase';
import _registerDesign from './_registerDesign';

class ScanDesign extends _CommandDesignBase {
    public readonly id = CommandId.Scan;
    public readonly name = 'Scan';
}

_registerDesign(new ScanDesign());
