import slice from './commandView.slice';

export const {
    updateCommandView
} = slice.actions;
export * from './commandView.selectors';

export default slice.reducer;
