import { crash } from '@/core';

import adapter from './scriptsSlice.adapter';

import type { ScriptState } from '@/types';
import type { SliceState } from './scriptsSlice.types';

const { selectById } = adapter.getSelectors();

export const _createScript: (name?: string) => ScriptState
= (name = 'script') => ({
    id: crypto.randomUUID(),
    name,
    instructions: [ ],
});

export const _selectScriptById: (state: SliceState, id: string) => ScriptState
= (state, id) => selectById(state, id)
|| crash(`Script ID (${id}) is not a valid script entities key.`);

export const _selectCurrentScript: (state: SliceState) => ScriptState
= (state) => _selectScriptById(state, state.currentId);
