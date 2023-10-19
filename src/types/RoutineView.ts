import { EntityId, EntityState } from '@reduxjs/toolkit';

import Entity from './Entity';

/**
 * Provides the non-persistent state for viewing a Routine.
 */
declare type RoutineView = Entity & {
    /** The routine's subroutines' IDs, in load order. */
    subroutines: EntityId[];
    /** The routine's total duration, in milliseconds. */
    duration: number;
    /** The routine's elapsed time, in milliseconds. */
    elapsed: number;
};

export declare type RoutineViewState = EntityState<RoutineView> & {
    currentId: EntityId;
}

export default RoutineView;
