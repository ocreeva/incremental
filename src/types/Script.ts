import Instruction from './Instruction';

export type ScriptId = string;

/**
 * Represents a script comprising an ordered collection of instructions.
 * 
 * @interface Script
 * @id {ScriptId} The script's ID.
 * @instructions {Instruction[]} The script's instructions.
 */
interface Script {
    id: ScriptId;
    instructions: Instruction[];
}

export default Script;
