import { CommandId } from '@/constants';

import CommandModel from '../CommandModel';

class BootModel extends CommandModel {
    constructor() {
        super(CommandId.Boot);
    }
}

export default BootModel;
