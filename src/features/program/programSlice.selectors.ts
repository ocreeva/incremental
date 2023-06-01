import { RootState } from "@/App/store";
import { ProgramInstruction } from "./programSlice.types";

export const selectProgramInstructions: (state: RootState) => ProgramInstruction[] =
    ({ program: { instructions } }) => instructions;

export const selectProgramHasInstructions: (state: RootState) => boolean =
    ({ program: { instructions } }) => instructions.length > 0;
