import type EntityState from './EntityState';
import type { EntityId } from './EntityState';

/**
 * Provides the UI state for a Script.
 */
declare type ScriptState = EntityState & {
    /** The script's name. */
    name: string;
    /** The script's instructions' IDs, in order of execution. */
    instructions: EntityId[];
};

export default ScriptState;
