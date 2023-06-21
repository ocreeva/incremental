import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './programSlice.reducers';

import type { ProgramState } from './programSlice.types';

const initialState: ProgramState = {
    currentScript: {
        key: crypto.randomUUID(),
        instructions: [],
    },
};

export default createSlice({
    name: 'program',
    initialState,
    reducers,
});
