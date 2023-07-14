import { type ScriptState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '../_utility';

const adapter = createConceptStateEntityAdapter<ScriptState>();

export const { selectById, selectIds } = getConceptStateEntitySelectors('scripts', adapter);

export default adapter;
