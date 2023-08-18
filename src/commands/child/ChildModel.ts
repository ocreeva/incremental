import { CommandId } from '@/constants';

import CommandModel from '../CommandModel';

class ChildModel extends CommandModel {
    constructor() {
        super(CommandId.Child);
    }
}

export default ChildModel;
