import { CommandId } from './Command';

export type OperationId = string;

/**
 * Represents an operation within a subroutine. As a subroutine describes the
 * execution status of a script, an operation describes the execution status of
 * an instruction within that script.
 * 
 * @interface Operation
 * @id {OperationId} The operation's ID.
 * @instructionId {InstructionId} The command's ID.
 */
interface Operation {
    id: OperationId;
    commandId: CommandId;
}

export default Operation;
