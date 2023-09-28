import slice from './commandData.slice';

export const {
    upsertCommandData
} = slice.actions;
export * from './commandData.selectors';

export default slice.reducer;
