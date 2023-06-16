import { RootState } from "@/App/store"
import { Routine } from "@/types"

export const selectCurrentRoutine: (state: RootState) => Routine | undefined
= ({ execution: { currentRoutine } }) => currentRoutine;
