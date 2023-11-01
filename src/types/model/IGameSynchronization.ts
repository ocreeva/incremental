import { EntityId } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { CommandData, CommandView, OperationView, RoutineView, SubroutineView } from '@/types';

/**
 * Represents the game's synchronization between UI and worker threads.
 */
declare interface IGameSynchronization {
    /** Whether the routine execution is complete. */
    routineIsComplete: boolean;

    /**
     * Add a new operation to the game state.
     * 
     * @param operation - The operation's state.
     */
    addOperation(operation: OperationView): void;

    /**
     * Add a new subroutine to the game state.
     * 
     * @param subroutine - The subroutine's state.
     */
    addSubroutine(subroutine: SubroutineView): void;

    /**
     * Set the active routine.
     * 
     * @param routine - The routine's state.
     */
    setRoutine(routine: RoutineView): void;

    /**
     * Update the persistent state data for a Command.
     * 
     * @param id - The command's ID.
     * @param update - The command's data updates.
     */
    updateCommandData(id: CommandId, update: Partial<CommandData>): void;

    /**
     * Update the non-persistent state for viewing a Command.
     * 
     * @param id - The command's ID.
     * @param update - The command's view updates.
     */
    updateCommandView(id: CommandId, update: Partial<CommandView>): void;

    /**
     * Update the state of an operation.
     * 
     * @param id - The operation's ID.
     * @param update - The operation's state updates.
     */
    updateOperation(id: EntityId, update: Partial<OperationView>): void;

    /**
     * Update the state of the current routine.
     * 
     * @param update - The routine's state update.
     */
    updateRoutine(update: Partial<RoutineView>): void;

    /**
     * Update the state of a subroutine.
     * 
     * @param id - The subroutine's ID.
     * @param update - The subroutine's state update.
     */
    updateSubroutine(id: EntityId, update: Partial<SubroutineView>): void;
}

export default IGameSynchronization;
