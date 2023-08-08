import type { CommandId } from '@/constants';

import type EntityId from './EntityId';
import type EntityState from './EntityState';

/**
 * Provides the UI state for an Operation.
 */
declare type OperationState = EntityState & {
    /** The command's ID. */
    commandId: CommandId;
    /** The operation's total duration, in game units (20ms / 1px). */
    duration: number;
    /** The parent subroutine's ID. */
    parentSubroutineId: EntityId;
    /** The parent routine's ID. */
    parentRoutineId: EntityId;
    /** The operation's progress to completion, as a percentage (0-100). */
    progress: number;

    /**
     * The operation's delay within the subroutine. This delay is measured from
     * the completion of the previous operation within the same subroutine, or
     * from the start of the subroutine if this is the first operation.
     */
    delay: number;
};

export default OperationState;
