import { type PayloadAction } from '@reduxjs/toolkit';

import { type GameState } from './gameSlice.types';

export const reset: (state: GameState) => GameState
= (state) => state;

export const setGameIsPlaying: (state: GameState, action: PayloadAction<boolean>) => void
= (state, { payload: isPlaying }) => { state.isPlaying = isPlaying; };
