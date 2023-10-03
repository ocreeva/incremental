import type { CommandId, Host, Role } from '@/constants';

import type EntityId from './EntityId';
import type EntityState from './EntityState';

/**
 * Provides the UI state for an Operation.
 */
declare type OperationState = EntityState & {
    /** The command's ID. */
    readonly commandId: CommandId;
    /** The parent subroutine's ID. */
    readonly parentSubroutineId: EntityId;
    /** The parent routine's ID. */
    readonly parentRoutineId: EntityId;

    /**
     * (optional) The operation's execution delay, in milliseconds. This delay is measured from the completion of the
     * last transition within the same subroutine, or from the start of the subroutine if this is the first operation.
     */
    delay?: number;
    /** The operation's total duration, in milliseconds. */
    duration: number;
    /** The parent subroutine's host at the start of the operation. */
    host: Host;
    /** The operation's progress to completion, as a percentage (0-1). */
    progress: number;
    /** The parent subroutine's role at the start of the operation. */
    role: Role;
};

export default OperationState;
