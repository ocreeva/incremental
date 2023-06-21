import type ConceptState from './ConceptState';
import type { InstructionState } from './InstructionTypes';

/**
 * Provides the UI state for a Script.
 * 
 * @key {string} The script's unique key.
 * @instructions {InstructionState[]} The script's instructions' states.
 */
export type ScriptState = ConceptState & {
    instructions: InstructionState[];
};
