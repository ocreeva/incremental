import { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';

import { crash } from '@/core';
import { Entity } from '@/types';

declare type SelectById<TEntity extends Entity> = (state: EntityState<TEntity>, id: EntityId) => TEntity;
declare type SelectIds<TEntity extends Entity> = (state: EntityState<TEntity>) => EntityId[];
declare type EntitySelectors<TEntity extends Entity> = {
    selectById: SelectById<TEntity>;
    selectIds: SelectIds<TEntity>;
};

const getConceptStateEntitySelectors: <TEntity extends Entity>(concept: string, adapter: EntityAdapter<TEntity>) => EntitySelectors<TEntity>
= (concept, adapter) => {
    const { selectIds, selectById } = adapter.getSelectors();
    return {
        selectById: (state, id) => selectById(state, id) || crash(`Entity ID '${id}' not found in ${concept} entities collection.`),
        selectIds,
    };
};

export default getConceptStateEntitySelectors;
