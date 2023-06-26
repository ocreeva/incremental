import type ConceptState from './ConceptState';

/**
 * Provides the UI state for a Script.
 * 
 * @id {string} The script's unique ID.
 * @instructions {InstructionState[]} The script's instructions' IDs, in order of execution.
 */
export type ScriptState = ConceptState & {
    instructions: string[];
};
