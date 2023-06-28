import slice from './subroutinesSlice';

export const {
    addSubroutines,
} = slice.actions;
export * from './subroutinesSlice.selectors';

export default slice.reducer;
