import type { CommandState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '@/features/_utility';

export const adapter = createConceptStateEntityAdapter<CommandState>();

export const { selectById } = getConceptStateEntitySelectors('commands', adapter);

export default adapter;
