import type Operation from './Operation';
import type { ScriptId } from './Script';

export type SubroutineId = string;

/**
 * Represents a subroutine comprising an ordered collection of operations. A
 * subroutine describes the execution status of a script, each operation
 * corresponding to one instruction in the script.
 * 
 * @interface Subroutine
 * @id {SubroutineId} The subroutine's ID.
 * @scriptId {ScriptId} The script's ID.
 * @operations {Operation[]} The subroutine's operations.
 */
interface Subroutine {
    id: SubroutineId;
    scriptId: ScriptId;
    operations: Operation[];
}

export default Subroutine;
