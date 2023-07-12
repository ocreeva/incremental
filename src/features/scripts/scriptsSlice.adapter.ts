import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_utility';

import type { ScriptState } from '@/types';

const adapter = createConceptStateEntityAdapter<ScriptState>();

export const { selectById, selectIds } = getConceptStateEntitySelectors('scripts', adapter);

export default adapter;
