import { CommandId } from '@/constants';
import type { EntityId } from '@/types';

import CommandModel from '../CommandModel';

class BootModel extends CommandModel {
    constructor(parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        super(CommandId.Boot, parentRoutineId, parentSubroutineId);
    }
}

export default BootModel;
