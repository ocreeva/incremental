import { createEntityAdapter } from '@reduxjs/toolkit';

import { crash } from '@/core';

import type { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';
import type ConceptState from '@/types/ConceptState';

export const createConceptStateEntityAdapter: <TEntity extends ConceptState>() => EntityAdapter<TEntity>
= <TEntity extends ConceptState>() => createEntityAdapter<TEntity>({
    selectId: ({ id }) => id,
});

declare type SelectById<TEntity extends ConceptState> = (state: EntityState<TEntity>, id: EntityId) => TEntity;
declare type SelectIds<TEntity extends ConceptState> = (state: EntityState<TEntity>) => EntityId[];
declare type StateEntitySelectors<TEntity extends ConceptState> = {
    selectById: SelectById<TEntity>;
    selectIds: SelectIds<TEntity>;
};

export const getConceptStateEntitySelectors: <TEntity extends ConceptState>(concept: string, adapter: EntityAdapter<TEntity>) => StateEntitySelectors<TEntity>
= (concept, adapter) => {
    const { selectIds, selectById } = adapter.getSelectors();
    return {
        selectById: (state, id) => selectById(state, id) || crash(`Entity ID '${id} not found in ${concept} entities collection.`),
        selectIds,
    };
};
