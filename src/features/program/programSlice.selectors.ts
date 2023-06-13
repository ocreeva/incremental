import { RootState } from '@/App/store';
import { Script } from '@/types';

export const selectCurrentScript: (state: RootState) => Script =
    ({ program: { currentScript } }) => currentScript;

export const selectCurrentScriptHasInstructions: (state: RootState) => boolean =
    ({ program: { currentScript: { instructions }}}) => instructions.length > 0;
