import executionSlice from './executionSlice';

export const { executeScript } = executionSlice.actions;
export * from './executionSlice.types';

export default executionSlice.reducer;
