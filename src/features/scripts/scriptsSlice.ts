import { createSlice } from '@reduxjs/toolkit';

import { type ScriptState } from '@/types';

import adapter from './scriptsSlice.adapter';
import * as reducers from './scriptsSlice.reducers';
import { _createScript } from './scriptsSlice.utility';
import { type AdditionalSliceState, type SliceState } from './scriptsSlice.types';

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
