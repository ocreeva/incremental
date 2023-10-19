import { EntityId, EntityState } from '@reduxjs/toolkit';

import { Host, Role } from '@/constants';

import Entity from './Entity';

/**
 * Provides the non-persistent state for viewing a Subroutine.
 */
declare type SubroutineView = Entity & {
    /** The subroutine's total duration, in milliseconds. */
    duration: number;
    /** The subroutine's operations' IDs, in order of execution. */
    operations: EntityId[];
    /** The parent routine's ID. */
    parentRoutineId: EntityId;
    /** The subroutine's host. */
    host: Host;
    /** The subroutine's role. */
    role: Role;
};

export declare type SubroutineViewState = EntityState<SubroutineView>;

export default SubroutineView;
