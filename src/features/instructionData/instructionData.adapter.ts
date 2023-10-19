import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_';
import { InstructionData } from '@/types';

const adapter = createConceptStateEntityAdapter<InstructionData>();

export const { selectById } = getConceptStateEntitySelectors('instructionData', adapter);

export default adapter;
