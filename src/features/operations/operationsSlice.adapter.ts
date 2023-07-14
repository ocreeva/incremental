import { type OperationState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '../_utility';

const adapter = createConceptStateEntityAdapter<OperationState>();

export const { selectById } = getConceptStateEntitySelectors('operations', adapter);

export default adapter;
