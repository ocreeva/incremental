import gameSlice from './gameSlice';

export const { setGameIsPaused } = gameSlice.actions;
export * from './gameSlice.selectors';
export * from './gameSlice.types';

export default gameSlice.reducer;
