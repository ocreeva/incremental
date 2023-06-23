import slice from './operationsSlice';

export const { updateOperations } = slice.actions;
export * from './operationsSlice.selectors';

export default slice.reducer;
