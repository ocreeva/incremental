import { type RoutineState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '../_utility';

const adapter = createConceptStateEntityAdapter<RoutineState>();

export const { selectById } = getConceptStateEntitySelectors('routines', adapter);

export default adapter;
