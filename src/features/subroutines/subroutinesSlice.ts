import { createSlice } from '@reduxjs/toolkit';

import adapter from './subroutinesSlice.adapter';
import * as reducers from './subroutinesSlice.reducers';
import { type AdditionalSliceState } from './subroutinesSlice.types';

const initialState = adapter.getInitialState<AdditionalSliceState>({ });

export default createSlice({
    name: 'subroutines',
    initialState,
    reducers,
});
