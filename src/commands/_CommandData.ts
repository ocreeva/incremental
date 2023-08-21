import type { CommandId } from '@/constants';
import type { CommandData, EntityId, GameModel, InstructionState, OperationState } from '@/types';

import _createCommandRecord from './_createCommandRecord';

abstract class _CommandData implements CommandData {
    public abstract readonly id: CommandId;

    public abstract createModel(
        instruction: InstructionState,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId
    ): GameModel<OperationState>;
}

export const [getData, registerData] = _createCommandRecord<CommandData>();
export default _CommandData;
