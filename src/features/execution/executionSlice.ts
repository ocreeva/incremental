import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './executionSlice.reducers';

import type { ExecutionState } from './executionSlice.types';

const initialState: ExecutionState = {
    currentRoutine: {
        key: '',
        subroutines: [],
        duration: 0,
    }
};

export default createSlice({
    name: 'execution',
    initialState,
    reducers,
});
