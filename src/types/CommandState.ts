import type { CommandId } from '@/constants';

/**
 * Provides the UI state for a Command.
 */
declare type InstructionState = {
    /** The command's ID. */
    readonly id: CommandId;
    /** The command's level. */
    level?: number;
    /** The command's progress to next level, as a percentage (0-1). */
    progress?: number;
};

export default InstructionState;
