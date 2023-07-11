import { createEntityAdapter } from '@reduxjs/toolkit';

import { crash } from '@/core';

import type { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';
import type ConceptState from '@/types/ConceptState';

export const createConceptStateEntityAdapter: <TEntity extends ConceptState>() => EntityAdapter<TEntity>
= <TEntity extends ConceptState>() => createEntityAdapter<TEntity>({
    selectId: ({ id }) => id,
});

export const selectStateEntityById: <TEntity extends ConceptState>(
    concept: string,
    selectById: (state: EntityState<TEntity>, id: EntityId) => TEntity | undefined,
    state: EntityState<TEntity>,
    id: EntityId
) => TEntity
= (concept, selectById, state, id) => selectById(state, id) || crash(`Entity ID '${id}' not found in ${concept} entities collection.`);
