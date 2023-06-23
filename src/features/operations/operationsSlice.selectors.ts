import { crash } from '@/core';

import type { RootState } from '@/App/store';
import type { OperationState } from '@/types';

export const selectOperation: (state: RootState, id: string) => OperationState
= ({ operations: { entities } }, id) => entities[id] || crash(`selectOperation called with missing ID (${id}).`);
