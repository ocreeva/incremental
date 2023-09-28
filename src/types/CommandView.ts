import type { EntityState } from '@reduxjs/toolkit';

import type { CommandId } from '@/constants';

/**
 * Provides the non-persistent state for viewing a Command.
 */
declare type CommandView = {
    /** The command's ID. */
    readonly id: CommandId;

    /** Whether the command is enabled in the lexicon. */
    isEnabled: boolean;
    /** Whether the command is visible in the lexicon. */
    isVisible: boolean;

    /** The command's level. */
    level: number;
    /** The command's progress to next level, as a percentage (0-1). */
    progress: number;
};

export declare type CommandViewState = EntityState<CommandView>;

export default CommandView;
