import { InstructionId } from './Instruction';

export type OperationId = string;

/**
 * Represents an operation within a subroutine. As a subroutine describes the
 * execution status of a script, an operation describes the execution status of
 * an instruction within that script.
 * 
 * @interface Operation
 * @id {OperationId} The operation's ID.
 * @instruction {InstructionId} The instruction's ID.
 */
interface Operation {
    id: OperationId;
    instruction: InstructionId;
}

export default Operation;
