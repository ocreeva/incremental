import type { EntityId } from '@reduxjs/toolkit';
import type ConceptState from './ConceptState';

/**
 * Provides the UI state for a Routine.
 * 
 * @id {EntityId} The routine's unique ID.
 * @subroutines {EntityId[]} The routine's subroutines' IDs, in load order.
 * @duration {number} The routine's total duration, in game units (20ms / 1px).
 */
export type RoutineState = ConceptState & {
    subroutines: EntityId[];
    duration: number;
};
