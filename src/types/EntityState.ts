import EntityId from './EntityId';

/**
 * Provides the UI state for an entity.
 */
declare type EntityState = {
    /** The state's unique ID. */
    readonly id: EntityId;
};

export default EntityState;
