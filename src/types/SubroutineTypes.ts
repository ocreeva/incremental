import ConceptModel from './ConceptModel';
import ConceptState from './ConceptState';
import { OperationModel } from './OperationTypes';

/**
 * Provides the UI model for a Subroutine.
 * 
 * @key {string} The subroutine's unique key.
 * @operations {OperationModel[]} The subroutine's operations' models.
 * @duration {number} The subroutine's total duration, in game units (20ms / 1px).
 */
export type SubroutineModel = ConceptModel & {
    operations: OperationModel[];
    duration: number;
}

/**
 * Provides the gameplay state for a Subroutine.
 */
export class SubroutineState extends ConceptState<SubroutineModel> { }
