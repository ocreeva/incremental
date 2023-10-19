import slice from './scriptData.slice';

export const {
    addInstructionToCurrentScript,
    createScript,
    deleteScript,
    removeInstructionFromCurrentScript,
    setCurrentScriptId,
} = slice.actions;
export * from './scriptData.selectors';

export type { CreateScriptProps, DeleteScriptProps } from './scriptData.reducers';

export default slice.reducer;
