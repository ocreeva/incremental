import type CommandId from './CommandId';
import type ConceptState from './ConceptState';

/**
 * Provides the UI state for an Instruction.
 * 
 * @key {string} The instructions's unique key.
 * @commandId {CommandId} The command's ID.
 */
export type InstructionState = ConceptState & {
    commandId: CommandId;
};
