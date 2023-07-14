import type { CommandId } from '@/commands';

/**
 * Provides the UI design data for a Command.
 */
declare type CommandDesign = {
    /** The command's unique ID. */
    readonly id: CommandId;
    /** The command's name. */
    readonly name: string;
};

export default CommandDesign;
