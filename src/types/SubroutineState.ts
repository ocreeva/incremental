import type EntityId from './EntityId';
import type EntityState from './EntityState';

/**
 * Provides the UI state for a Subroutine.
 */
declare type SubroutineState = EntityState & {
    /** The subroutine's operations' IDs, in order of execution. */
    operations: EntityId[];
    /** The subroutine's total duration, in game units (20ms / 1px). */
    duration: number;
};

export default SubroutineState;
