import type { PayloadAction } from '@reduxjs/toolkit';
import type { CommandId } from '@/types';
import type { ProgramState } from './programSlice.types';

type CommandIdPayload = {
    commandId: CommandId;
};

type InstructionKeyPayload = {
    key: string;
};

export const addInstruction: (state: ProgramState, payload: PayloadAction<CommandIdPayload>) => void
= ({ currentScript }, { payload: { commandId } }) => {
    const key = crypto.randomUUID();
    currentScript.instructions.push({ key, commandId });
};

export const removeInstruction: (state: ProgramState, payload: PayloadAction<InstructionKeyPayload>) => void
= ({ currentScript }, { payload: { key } }) => {
    currentScript.instructions = currentScript.instructions.filter(instruction => instruction.key !== key);
};
