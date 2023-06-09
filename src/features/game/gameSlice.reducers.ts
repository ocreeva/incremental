import { PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameSlice.types';

export const setGameIsPaused = (state: GameState, { payload: gameIsPaused }: PayloadAction<boolean>): void => {
    state.isPaused = gameIsPaused;
};
