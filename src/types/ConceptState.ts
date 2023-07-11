import type { EntityId } from '@reduxjs/toolkit';

/**
 * Provides the UI state for an instance of a game concept.
 */
type ConceptState = {
    /** The model's unique ID. */
    readonly id: EntityId;
};

export default ConceptState;
