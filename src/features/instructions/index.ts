import slice from './instructionsSlice';

export const { addInstruction, removeInstruction, updateInstruction } = slice.actions;
export * from './instructionsSlice.selectors';

export default slice.reducer;
