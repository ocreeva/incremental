import type { CommandId } from '@/constants';

import type GameModel from './GameModel';
import type InstructionState from './InstructionState';
import type OperationState from './OperationState';

/**
 * Provides the gameplay data for a Command.
 */
declare interface CommandData {
    /** The command's unique ID. */
    readonly id: CommandId;

    createModel(instruction: InstructionState): GameModel<OperationState>;
}

export default CommandData;
