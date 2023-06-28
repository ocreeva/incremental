import slice from './operationsSlice';

export const {
    addOperations,
    updateOperations,
} = slice.actions;
export * from './operationsSlice.selectors';

export default slice.reducer;
