import type ConceptState from './ConceptState';

/**
 * Provides the UI state for a Subroutine.
 * 
 * @id {string} The subroutine's unique ID.
 * @operations {string[]} The subroutine's operations' IDs, in order of execution.
 * @duration {number} The subroutine's total duration, in game units (20ms / 1px).
 */
export type SubroutineState = ConceptState & {
    operations: string[];
    duration: number;
};
