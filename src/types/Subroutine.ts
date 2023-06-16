import type Operation from './Operation';

export type SubroutineId = string;

/**
 * Represents a subroutine comprising an ordered collection of operations. A
 * subroutine describes the execution status of a script, each operation
 * corresponding to one instruction in the script.
 * 
 * @interface Subroutine
 * @id {SubroutineId} The subroutine's ID.
 * @operations {Operation[]} The subroutine's operations.
 */
interface Subroutine {
    id: SubroutineId;
    operations: Operation[];
}

export default Subroutine;
