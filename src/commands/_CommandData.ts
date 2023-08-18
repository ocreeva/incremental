import type { CommandId } from '@/constants';
import type { CommandData, CommandState, GameModel, InstructionState } from '@/types';

import _createCommandRecord from './_createCommandRecord';

abstract class _CommandData implements CommandData {
    public abstract readonly id: CommandId;

    public abstract createModel(instruction: InstructionState): GameModel<CommandState>;
}

export const [getData, registerData] = _createCommandRecord<CommandData>();
export default _CommandData;
