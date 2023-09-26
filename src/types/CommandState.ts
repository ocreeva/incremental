import type { CommandId } from '@/constants';

/**
 * Provides the UI state for a Command.
 */
declare type CommandState = {
    /** The command's ID. */
    readonly id: CommandId;

    /** Whether the command is enabled in the lexicon. */
    isEnabled?: boolean;
    /** Whether the command is visible in the lexicon. */
    isVisible?: boolean;

    /** The command's level. */
    level?: number;
    /** The command's progress to next level, as a percentage (0-1). */
    progress?: number;
};

export default CommandState;
