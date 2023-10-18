import gameSlice from './game.slice';

export const { reset, setGameIsPlaying } = gameSlice.actions;
export * from './game.selectors';

export default gameSlice.reducer;
