import { EntityId, EntityState } from '@reduxjs/toolkit';

import { CommandId, ErrorCode, Host, Role } from '@/constants';

import Entity from './Entity';

/**
 * Provides the non-persistent state for viewing an Operation.
 */
declare type OperationView = Entity & {
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
    /** The errors impacting operation execution, if any. Each errors is composed of a cause and a code. */
    errors: ErrorCode[];
    /** The parent subroutine's host at the start of the operation. */
    host: Host;
    /** The operation's progress to completion, as a percentage (0-1). */
    progress: number;
    /** The parent subroutine's role at the start of the operation. */
    role: Role;
    /** The time spent transitioning from the previous command, in milliseconds. */
    transition: number;
};

export declare type OperationViewState = EntityState<OperationView>;

export default OperationView;
