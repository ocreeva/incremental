import { createSlice } from '@reduxjs/toolkit';

import adapter from './subroutinesSlice.adapter';
import * as reducers from './subroutinesSlice.reducers';

const initialState = adapter.getInitialState();

export default createSlice({
    name: 'subroutines',
    initialState,
    reducers,
});
