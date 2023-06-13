import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './executionSlice.reducers';
import { ExecutionState } from './executionSlice.types';

const initialState: ExecutionState = { };

export default createSlice({
    name: 'execution',
    initialState,
    reducers,
});
