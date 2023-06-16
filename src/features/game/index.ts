import gameSlice from './gameSlice';

export const { setGameIsPlaying } = gameSlice.actions;
export * from './gameSlice.selectors';
export * from './gameSlice.types';

export default gameSlice.reducer;
