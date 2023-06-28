import type CommandId from './CommandId';
import type ConceptState from './ConceptState';

/**
 * Provides the UI state for an Operation.
 * 
 * @id {string} The operation's unique ID.
 * @commandId {CommandId} The command's ID.
 * @duration {number} The operation's total duration, in game units (20ms / 1px).
 * @progress {number} The operation's progress to completion, as a percentage (0-100).
 */
export type OperationState = ConceptState & {
    commandId: CommandId;
    duration: number;
    progress: number;
};

