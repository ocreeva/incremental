import type { CommandId } from './CommandData';

export type InstructionId = string;

/**
 * Represents an instruction to execute a command in a script.
 * 
 * @interface Instruction
 * @id {InstructionId} The instruction's ID.
 * @commandId {CommandId} The command's ID.
 */
interface Instruction {
    id: InstructionId;
    commandId: CommandId;
}

export default Instruction;
