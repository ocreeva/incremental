import type CommandId from './CommandId';
import type ConceptState from './ConceptState';

/**
 * Provides the UI state for an Instruction.
 * 
 * @id {string} The instructions's unique ID.
 * @commandId {CommandId} The command's ID.
 */
export type InstructionState = ConceptState & {
    commandId: CommandId;
};
