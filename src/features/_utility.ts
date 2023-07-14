import { createEntityAdapter, type EntityAdapter, type EntityState as EntityCollectionState } from '@reduxjs/toolkit';

import { crash } from '@/core';
import { type EntityId } from '@/types';
import type EntityState from '@/types/EntityState';

export const createConceptStateEntityAdapter: <TEntity extends EntityState>() => EntityAdapter<TEntity>
= <TEntity extends EntityState>() => createEntityAdapter<TEntity>({
    selectId: ({ id }) => id,
});

declare type SelectById<TEntity extends EntityState> = (state: EntityCollectionState<TEntity>, id: EntityId) => TEntity;
declare type SelectIds<TEntity extends EntityState> = (state: EntityCollectionState<TEntity>) => EntityId[];
declare type StateEntitySelectors<TEntity extends EntityState> = {
    selectById: SelectById<TEntity>;
    selectIds: SelectIds<TEntity>;
};

export const getConceptStateEntitySelectors: <TEntity extends EntityState>(concept: string, adapter: EntityAdapter<TEntity>) => StateEntitySelectors<TEntity>
= (concept, adapter) => {
    const { selectIds, selectById } = adapter.getSelectors();
    return {
        selectById: (state, id) => selectById(state, id) || crash(`Entity ID '${id} not found in ${concept} entities collection.`),
        selectIds,
    };
};
