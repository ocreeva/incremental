import ConceptModel from './ConceptModel';

import type ConceptState from './ConceptState';
import type { SubroutineState } from './SubroutineTypes';

/**
 * Provides the UI state for a Routine.
 * 
 * @key {string} The routine's unique key.
 * @subroutines {SubroutineState[]} The routine's subroutines' states.
 * @duration {number} The routine's total duration, in game units (20ms / 1px).
 */
export type RoutineState = ConceptState & {
    subroutines: SubroutineState[];
    duration: number;
};

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel extends ConceptModel<RoutineState> { }
