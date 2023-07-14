import { createSlice } from '@reduxjs/toolkit';

import { type RoutineState } from '@/types';

import adapter from './routinesSlice.adapter';
import * as reducers from './routinesSlice.reducers';
import { type AdditionalSliceState } from './routinesSlice.types';

const initialRoutine: RoutineState = {
    id: crypto.randomUUID(),
    subroutines: [ ],
    duration: 0,
};
let initialState = adapter.getInitialState<AdditionalSliceState>({
    currentId: initialRoutine.id,
});
initialState = adapter.addOne(initialState, initialRoutine);

export default createSlice({
    name: 'routines',
    initialState,
    reducers,
});
