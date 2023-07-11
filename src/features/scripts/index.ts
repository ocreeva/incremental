import slice from './scriptsSlice';

export const {
    addInstructionToCurrentScript,
    createScript,
    deleteScript,
    removeInstructionFromCurrentScript
} = slice.actions;
export * from './scriptsSlice.selectors';

export type { CreateScriptProps, DeleteScriptProps } from './scriptsSlice.reducers';

export default slice.reducer;
