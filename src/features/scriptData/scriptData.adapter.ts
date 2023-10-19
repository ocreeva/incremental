import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_';
import { ScriptData } from '@/types';

const adapter = createConceptStateEntityAdapter<ScriptData>();

export const { selectById, selectIds } = getConceptStateEntitySelectors('scriptData', adapter);

export default adapter;
