import slice from './subroutineView.slice';

export const {
    addSubroutines,
    updateSubroutines,
} = slice.actions;
export * from './subroutineView.selectors';

export default slice.reducer;
