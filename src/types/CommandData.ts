import type { CommandId } from '@/commands';

/**
 * Provides the gameplay data for a Command.
 */
declare type CommandData = {
    /** The command's unique ID. */
    readonly id: CommandId;
};

export default CommandData;
