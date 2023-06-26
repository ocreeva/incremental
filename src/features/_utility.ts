import { createEntityAdapter } from '@reduxjs/toolkit';

import type { EntityAdapter } from '@reduxjs/toolkit';
import type ConceptState from '@/types/ConceptState';

export const createConceptStateEntityAdapter: <TEntity extends ConceptState>() => EntityAdapter<TEntity>
= <TEntity extends ConceptState>() => createEntityAdapter<TEntity>({
    selectId: ({ id }) => id,
});
