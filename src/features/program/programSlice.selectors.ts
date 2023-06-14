import { RootState } from '@/App/store';
import { Instruction, Script } from '@/types';

export const selectCurrentScript: (state: RootState) => Script =
    ({ program: { currentScript } }) => currentScript;

export const selectCurrentScriptInstructions: (state: RootState) => Instruction[] =
    ({ program: { currentScript: { instructions } } }) => instructions;
