import type { CommandId } from '@/constants';

import type EntityId from './EntityId';
import type GameModel from './GameModel';
import type InstructionState from './InstructionState';
import type OperationState from './OperationState';

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
     * @param parentRoutineId - The parent routine's ID.
     * @param parentSubroutineId - The parent subroutine's ID.
     * 
     * @returns The game model.
     */
    createModel(
        instruction: InstructionState,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId
    ): GameModel<OperationState>;
}

export default CommandData;
