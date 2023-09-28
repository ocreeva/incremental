import type { EntityState } from '@reduxjs/toolkit';

import type { CommandId } from '@/constants';

/**
 * Provides the persistent state data for a Command.
 */
declare type CommandData = {
    /** The command's ID. */
    readonly id: CommandId;

    /** The time accrued to command progress. */
    time?: number;
};

export declare type CommandDataState = EntityState<CommandData>;

export default CommandData;
