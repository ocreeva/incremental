import type { Role } from '@/constants';

import type EntityId from './EntityId';
import type EntityState from './EntityState';

/**
 * Provides the UI state for a Subroutine.
 */
declare type SubroutineState = EntityState & {
    /** The subroutine's total duration, in game units (20ms / 1px). */
    duration: number;
    /** The subroutine's operations' IDs, in order of execution. */
    operations: EntityId[];
    /** The parent routine's ID. */
    parentRoutineId: EntityId;
    /** The subroutine's role. */
    role: Role;
};

export default SubroutineState;
