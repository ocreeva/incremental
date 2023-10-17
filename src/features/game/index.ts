import gameSlice from './gameSlice';

export const { reset, setGameIsPlaying } = gameSlice.actions;
export * from './gameSlice.selectors';
export * from './gameSlice.types';

export default gameSlice.reducer;
