import ConceptModel from './ConceptModel';

import type ConceptState from './ConceptState';

/**
 * Provides the UI state for a Routine.
 * 
 * @id {string} The routine's unique ID.
 * @subroutines {string[]} The routine's subroutines' IDs, in load order.
 * @duration {number} The routine's total duration, in game units (20ms / 1px).
 */
export type RoutineState = ConceptState & {
    subroutines: string[];
    duration: number;
};

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel extends ConceptModel<RoutineState> { }
