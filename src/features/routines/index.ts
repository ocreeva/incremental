import slice from './routinesSlice';

export const {
    addRoutine,
    setCurrentRoutineId,
} = slice.actions;
export * from './routinesSlice.selectors';

export default slice.reducer;
