import { crash } from '@/core';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { InstructionState } from '@/types';

export const selectInstruction: (state: RootState, id: EntityId) => InstructionState
= ({ instructions: { entities } }, id) => entities[id] || crash(`selectInstruction called with missing ID (${id}).`);
