import type { CommandState } from '@/types';

import { createConceptStateEntityAdapter } from '../_utility';

const adapter = createConceptStateEntityAdapter<CommandState>();

export default adapter;
