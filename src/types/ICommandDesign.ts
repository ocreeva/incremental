import type { CommandAsInstruction, CommandId } from '@/constants';

import type CommandState from './CommandState';
import type InstructionState from './InstructionState';

/**
 * Represents the UI design data for a Command.
 */
declare interface _ICommandDesign {
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
}

declare type ICommandDesign = {
    readonly [P in keyof CommandState]-?: NonNullable<CommandState[P]>;
} & _ICommandDesign;

export default ICommandDesign;
