import slice from './operationView.slice';

export const {
    addOperations,
    updateOperations,
} = slice.actions;
export * from './operationView.selectors';

export default slice.reducer;
