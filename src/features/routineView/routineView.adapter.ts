import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_';
import { RoutineView } from '@/types';

const adapter = createConceptStateEntityAdapter<RoutineView>();

export const { selectById } = getConceptStateEntitySelectors('routineView', adapter);

export default adapter;
