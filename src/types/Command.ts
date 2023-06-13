/**
 * Enumerates the unique identifiers of all commands.
 * 
 * @enum CommandId
 */
export enum CommandId {
    Login = 'login',
    Scan = 'scan'
}

/**
 * Represents a command.
 * 
 * @interface Command
 * @id {CommandId} The command's ID.
 * @name {string} The command's name.
 */
interface Command {
    id: CommandId;
    name: string;
}

export default Command;
