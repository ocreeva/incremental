import { createSlice } from '@reduxjs/toolkit';

import adapter from './scriptsSlice.adapter';
import * as reducers from './scriptsSlice.reducers';
import { _createScript } from './scriptsSlice.utility';

import type { AdditionalSliceState, SliceState } from './scriptsSlice.types';
import type { ScriptState } from '@/types';

const initialScript: ScriptState = _createScript('main');
let initialState: SliceState = adapter.getInitialState<AdditionalSliceState>({
    currentId: initialScript.id,
});
initialState = adapter.addOne(initialState, initialScript);

export default createSlice({
    name: 'scripts',
    initialState,
    reducers,
});
