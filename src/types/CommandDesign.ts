import type { CommandAsInstruction, CommandId } from '@/constants';

import type InstructionState from './InstructionState';

/**
 * Represents the UI design data for a Command.
 */
declare interface CommandDesign {
    /** The command's unique ID. */
    readonly id: CommandId;
    /** The command's name. */
    readonly name: string;
    /** The path to the command's glyph. */
    readonly glyphPath: string;

    /** The behavior of the command when presented as an instruction. */
    readonly asInstruction: CommandAsInstruction;
    /** The command's subcommands. */
    readonly subcommands?: CommandId[];

    /** Whether the command can be an instruction in a script. */
    readonly canBeInstruction: boolean;
    /** Whether the command should display its progress. */
    readonly shouldShowProgress: boolean;

    /**
     * Creates an instruction to run the command in the current script.
     * 
     * @returns The instruction.
     */
    createInstruction: () => InstructionState;

    /**
     * Determines whether the command should be available in the Lexicon.
     * 
     * @returns 'true' if the command should be available in the Lexicon;
     * otherwise, 'false'.
     */
    isInLexicon: () => boolean;
}

export default CommandDesign;
