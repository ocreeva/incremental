import slice from './commandsSlice';

export const {
    updateCommands,
} = slice.actions;
export * from './commandsSlice.selectors';

export default slice.reducer;
