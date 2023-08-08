import { CommandId } from '@/constants';
import type { EntityId } from '@/types';

import CommandModel from '../CommandModel';

class ChildModel extends CommandModel {
    constructor(parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        super(CommandId.Child, parentRoutineId, parentSubroutineId);
    }
}

export default ChildModel;
