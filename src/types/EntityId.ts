/**
 * Provides the unique ID for an entity.
 * 
 * @remarks
 * Duplicated from @redux/toolkit package, to allow type usage in a web worker
 * without creating a Redux toolkit dependency.
 */
declare type EntityId = string | number;

export default EntityId;
