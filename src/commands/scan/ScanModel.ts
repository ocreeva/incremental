import { CommandId } from '@/constants';
import type { EntityId } from '@/types';

import CommandModel from '../CommandModel';

class ScanModel extends CommandModel {
    constructor(parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        super(CommandId.Scan, parentRoutineId, parentSubroutineId);
    }
}

export default ScanModel;
