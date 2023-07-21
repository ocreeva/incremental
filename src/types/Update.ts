import type EntityId from './EntityId';

/**
 * Provides an update for an entity.
 * 
 * @typeParam T - The type of the entity.
 * 
 * @remarks
 * Duplicated from @redux/toolkit package, to allow type usage in a web worker
 * without creating a Redux toolkit dependency.
 */
declare type Update<T> = {
    id: EntityId;
    changes: Partial<T>;
};

export default Update;
