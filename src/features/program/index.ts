import programSlice from './programSlice';

export const { addInstructionToProgram, removeInstructionFromProgram } = programSlice.actions;
export * from './programSlice.selectors';
export * from './programSlice.types';

export default programSlice.reducer;
