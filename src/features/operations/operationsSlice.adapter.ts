import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_utility';

import type { OperationState } from '@/types';

const adapter = createConceptStateEntityAdapter<OperationState>();

export const { selectById } = getConceptStateEntitySelectors('operations', adapter);

export default adapter;
