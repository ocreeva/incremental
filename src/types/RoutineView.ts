import { EntityId, EntityState } from '@reduxjs/toolkit';

import Entity from './Entity';

/**
 * Provides the non-persistent state for viewing a Routine.
 */
declare type RoutineView = Entity & {
    /** The routine's subroutines' IDs, in load order. */
    subroutines: EntityId[];
    /**
     * The routine's total duration, in milliseconds. This is the duration necessary to run all subroutines, and may
     * exceed the maximum allowed duration.
     */
    duration: number;
    /** The routine's elapsed time, in milliseconds. */
    elapsed: number;
    /** The routine's maximum duration, in milliseconds. This is based on the Overclock command's level. */
    maxDuration: number;
};

export declare type RoutineViewState = EntityState<RoutineView> & {
    currentId: EntityId;
}

export default RoutineView;
