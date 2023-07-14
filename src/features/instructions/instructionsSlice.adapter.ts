import { type InstructionState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '../_utility';

const adapter = createConceptStateEntityAdapter<InstructionState>();

export const { selectById } = getConceptStateEntitySelectors('instructions', adapter);

export default adapter;
