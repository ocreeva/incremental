import type { CommandState } from '@/types';

import { createConceptStateEntityAdapter, getConceptStateEntitySelectors } from '../_utility';

const adapter = createConceptStateEntityAdapter<CommandState>();

export const { selectById } = getConceptStateEntitySelectors('commands', adapter);

export default adapter;
