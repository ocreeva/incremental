/**
 * Provides the unique ID for an entity.
 * 
 * @remarks
 * Duplicated from @redux/toolkit package, to allow type usage in a web worker
 * without creating a Redux toolkit dependency.
 */
export declare type EntityId = string | number;

/**
 * Provides the UI state for an entity.
 */
declare type EntityState = {
    /** The state's unique ID. */
    readonly id: EntityId;
};

export default EntityState;
