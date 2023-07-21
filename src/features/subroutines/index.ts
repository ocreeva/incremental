import slice from './subroutinesSlice';

export const {
    addSubroutines,
    updateSubroutines,
} = slice.actions;
export * from './subroutinesSlice.selectors';

export default slice.reducer;
