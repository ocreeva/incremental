import type { CommandId } from '@/constants';

import type GameModel from './GameModel';
import type InstructionState from './InstructionState';
import type CommandState from './CommandState';

/**
 * Provides the gameplay data for a Command.
 */
declare interface CommandData {
    /** The command's unique ID. */
    readonly id: CommandId;

    /**
     * Create a game model for an operation executing an instruction for this command.
     * 
     * @param instruction - The instruction.
     * 
     * @returns The game model.
     */
    createModel(instruction: InstructionState): GameModel<CommandState>;
}

export default CommandData;
