import { EntityId, EntityState } from '@reduxjs/toolkit';

import Entity from './Entity';

/**
 * Provides the persistent state data for a Script.
 */
declare type ScriptData = Entity & {
    /** The script's name. */
    name: string;
    /** The script's instructions' IDs, in order of execution. */
    instructions: EntityId[];
};

export declare type ScriptDataState = EntityState<ScriptData> & {
    currentId: EntityId;
};

export default ScriptData;
