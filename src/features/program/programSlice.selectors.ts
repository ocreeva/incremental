import type { RootState } from '@/App/store';
import type { InstructionState, ScriptState } from '@/types';

export const selectCurrentScript: (state: RootState) => ScriptState
= ({ program: { currentScript } }) => currentScript;

export const selectCurrentScriptInstructions: (state: RootState) => InstructionState[]
= ({ program: { currentScript: { instructions } } }) => instructions;
