import { EntityAdapter, createEntityAdapter } from '@reduxjs/toolkit';

import { Entity } from '@/types';

const createConceptStateEntityAdapter: <TEntity extends Entity>() => EntityAdapter<TEntity>
= <TEntity extends Entity>() => createEntityAdapter<TEntity>({
    selectId: ({ id }) => id,
});

export default createConceptStateEntityAdapter;
