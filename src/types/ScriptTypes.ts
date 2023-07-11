import type { EntityId } from '@reduxjs/toolkit';
import type ConceptState from './ConceptState';

/**
 * Provides the UI state for a Script.
 * 
 * @id {string} The script's unique ID.
 * @name {string} The script's name.
 * @instructions {EntityId[]} The script's instructions' IDs, in order of execution.
 */
export type ScriptState = ConceptState & {
    name: string;
    instructions: EntityId[];
};
