import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameState } from './gameSlice.types';

export const setGameIsPlaying: (state: GameState, action: PayloadAction<boolean>) => void
= (state, { payload: isPlaying }) => { state.isPlaying = isPlaying; };
