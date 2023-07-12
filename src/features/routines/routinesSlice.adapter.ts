import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_utility';

import type { RoutineState } from '@/types';

const adapter = createConceptStateEntityAdapter<RoutineState>();

export const { selectById } = getConceptStateEntitySelectors('routines', adapter);

export default adapter;
