import { type SubroutineState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '../_utility';

const adapter = createConceptStateEntityAdapter<SubroutineState>();

export const { selectById } = getConceptStateEntitySelectors('subroutines', adapter);

export default adapter;
