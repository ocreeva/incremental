import type EntityId from './EntityId';
import type EntityState from './EntityState';

/**
 * Provides the UI state for a Routine.
 */
declare type RoutineState = EntityState & {
    /** The routine's subroutines' IDs, in load order. */
    subroutines: EntityId[];
    /** The routine's total duration, in milliseconds. */
    duration: number;
    /** The routine's elapsed time, in milliseconds. */
    elapsed: number;
};

export default RoutineState;
