import ConceptModel from './ConceptModel';

import type ConceptState from './ConceptState';
import type { OperationState } from './OperationTypes';

/**
 * Provides the UI state for a Subroutine.
 * 
 * @key {string} The subroutine's unique key.
 * @operations {OperationState[]} The subroutine's operations' states.
 * @duration {number} The subroutine's total duration, in game units (20ms / 1px).
 */
export type SubroutineState = ConceptState & {
    operations: OperationState[];
    duration: number;
};

/**
 * Provides the gameplay model for a Subroutine.
 */
export class SubroutineModel extends ConceptModel<SubroutineState> { }
