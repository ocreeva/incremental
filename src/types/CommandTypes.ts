import CommandId from './CommandId';
import ConceptData from './ConceptData';
import ConceptDesign from './ConceptDesign';
import ConceptModel from './ConceptModel';
import ConceptState from './ConceptState';

/**
 * Provides the UI design data for a Command.
 * 
 * @name {string} The command's name.
 */
export type CommandDesign = ConceptDesign & {
    readonly name: string;
}

/**
 * Provides the gameplay data for a Command.
 * 
 * @id {CommandId} The command's ID.
 */
export type CommandData = ConceptData<CommandDesign> & {
    readonly id: CommandId;
}

/**
 * Provides the UI model for a Command.
 */
export type CommandModel = ConceptModel & { }

/**
 * Provides the gameplay state for a Command.
 */
export class CommandState extends ConceptState<CommandModel> { }
