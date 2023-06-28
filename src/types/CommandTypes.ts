import type CommandId from './CommandId';
import type ConceptData from './ConceptData';
import type ConceptDesign from './ConceptDesign';
import type ConceptState from './ConceptState';

/**
 * Provides the UI design data for a Command.
 * 
 * @name {string} The command's name.
 */
export type CommandDesign = ConceptDesign & {
    readonly name: string;
};

/**
 * Provides the gameplay data for a Command.
 * 
 * @id {CommandId} The command's ID.
 */
export type CommandData = ConceptData<CommandDesign> & {
    readonly id: CommandId;
};

/**
 * Provides the UI state for a Command.
 */
export type CommandState = ConceptState & { };
