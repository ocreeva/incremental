import type EntityId from './EntityId';
import type EntityState from './EntityState';

/**
 * Provides the UI state for a Routine.
 */
declare type RoutineState = EntityState & {
    /** The routine's subroutines' IDs, in load order. */
    subroutines: EntityId[];
    /** The routine's total duration, in game units (20ms / 1px). */
    duration: number;
    /** The routine's elapsed time, in game units (20ms / 1px). */
    elapsed: number;
};

export default RoutineState;
