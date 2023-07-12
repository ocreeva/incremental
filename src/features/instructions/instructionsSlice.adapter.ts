import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_utility';

import type { InstructionState } from '@/types';

const adapter = createConceptStateEntityAdapter<InstructionState>();

export const { selectById } = getConceptStateEntitySelectors('instructions', adapter);

export default adapter;
