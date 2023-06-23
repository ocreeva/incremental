import { createSlice } from '@reduxjs/toolkit';

import adapter from './subroutinesSlice.adapter';

const initialState = adapter.getInitialState();

export default createSlice({
    name: 'subroutines',
    initialState,
    reducers: {},
});
