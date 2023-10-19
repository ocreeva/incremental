import slice from './instructionData.slice';

export const { addInstruction, removeInstruction, updateInstruction } = slice.actions;
export * from './instructionData.selectors';

export default slice.reducer;
