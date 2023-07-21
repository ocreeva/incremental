import type { CommandId } from '@/constants';

import type CommandModel from './CommandModel';
import type InstructionState from './InstructionState';

/**
 * Provides the gameplay data for a Command.
 */
declare interface CommandData {
    /** The command's unique ID. */
    readonly id: CommandId;

    createModel(instruction: InstructionState): CommandModel;
}

export default CommandData;
