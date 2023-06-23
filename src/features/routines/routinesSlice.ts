import { createSlice } from '@reduxjs/toolkit';

import adapter from './routinesSlice.adapter';

import type { AdditionalSliceState } from './routinesSlice.types';

const initialState = adapter.getInitialState<AdditionalSliceState>({ });

export default createSlice({
    name: 'routines',
    initialState,
    reducers: { },
});
