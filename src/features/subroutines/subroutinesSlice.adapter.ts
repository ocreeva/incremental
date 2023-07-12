import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_utility';

import type { SubroutineState } from '@/types';

const adapter = createConceptStateEntityAdapter<SubroutineState>();

export const { selectById } = getConceptStateEntitySelectors('subroutines', adapter);

export default adapter;
