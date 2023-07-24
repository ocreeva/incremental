import { CommandId } from '@/constants';

import CommandModel from '../CommandModel';

class ScanModel extends CommandModel {
    constructor() {
        super(CommandId.Scan);
    }
}

export default ScanModel;
