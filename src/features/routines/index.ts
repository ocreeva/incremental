import slice from './routinesSlice';

export const {
    addRoutine,
    removeRoutine,
    setCurrentRoutineId,
    updateCurrentRoutine,
} = slice.actions;
export * from './routinesSlice.selectors';

export default slice.reducer;
