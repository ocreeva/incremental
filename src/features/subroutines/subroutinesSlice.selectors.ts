import { crash } from '@/core';

import type { RootState } from '@/App/store';
import type { SubroutineState } from '@/types';

export const selectSubroutine: (state: RootState, id: string) => SubroutineState
= ({ subroutines: { entities } }, id) => entities[id] || crash(`selectSubroutine called with missing ID (${id}).`);
