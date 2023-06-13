import programSlice from './programSlice';

export const { addInstruction, removeInstruction } = programSlice.actions;
export * from './programSlice.selectors';
export * from './programSlice.types';

export default programSlice.reducer;
