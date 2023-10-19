import slice from './routineView.slice';

export const {
    addRoutine,
    removeRoutine,
    setCurrentRoutineId,
    updateCurrentRoutine,
} = slice.actions;
export * from './routineView.selectors';

export default slice.reducer;
