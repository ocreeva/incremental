import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_';
import { OperationView } from '@/types';

const adapter = createConceptStateEntityAdapter<OperationView>();

export const { selectById } = getConceptStateEntitySelectors('operationView', adapter);

export default adapter;
