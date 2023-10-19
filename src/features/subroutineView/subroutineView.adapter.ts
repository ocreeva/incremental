import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_';
import { SubroutineView } from '@/types';

const adapter = createConceptStateEntityAdapter<SubroutineView>();

export const { selectById } = getConceptStateEntitySelectors('subroutineView', adapter);

export default adapter;
