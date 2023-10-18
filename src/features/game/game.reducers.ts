import { PayloadAction } from '@reduxjs/toolkit';

import { GameState } from '@/types';

import initialState from './game.initial';

export const reset: (state: GameState) => GameState
= () => initialState;

export const setGameIsPlaying: (state: GameState, action: PayloadAction<boolean>) => GameState
= (state, { payload: isPlaying }) => ({ ...state, isPlaying });
