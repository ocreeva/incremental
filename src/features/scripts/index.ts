import slice from './scriptsSlice';

export const {
    addInstructionToCurrentScript,
    createScript,
    removeInstructionFromCurrentScript
} = slice.actions;
export * from './scriptsSlice.selectors';

export type { CreateScriptProps } from './scriptsSlice.reducers';

export default slice.reducer;
