import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './gameSlice.reducers';

import type { GameState } from './gameSlice.types';

const initialState: GameState = {
    isPlaying: false,
};

export default createSlice({
    name: 'game',
    initialState,
    reducers
});
