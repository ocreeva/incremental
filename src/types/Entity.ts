import { EntityId } from "@reduxjs/toolkit";

/**
 * Provides an entity.
 */
declare type Entity = {
    /** The state's unique ID. */
    readonly id: EntityId;
};

export default Entity;
