import slice from './scriptsSlice';

export const {
    addInstructionToCurrentScript,
    removeInstructionFromCurrentScript
} = slice.actions;
export * from './scriptsSlice.selectors';

export default slice.reducer;
