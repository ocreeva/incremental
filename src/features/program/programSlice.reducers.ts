import { PayloadAction } from '@reduxjs/toolkit';
import { ProgramState } from './programSlice.types';
import CommandId from '@/data/CommandId';

interface InstructionPayload {
    command: CommandId;
}

interface InstructionIdPayload {
    id: string;
}

export const addInstructionToProgram = (state: ProgramState, { payload: { command } }: PayloadAction<InstructionPayload>): void => {
    const id = crypto.randomUUID();
    state.instructions.push({ id, command });
}

export const removeInstructionFromProgram = (state: ProgramState, { payload: { id } }: PayloadAction<InstructionIdPayload>): void => {
    state.instructions = state.instructions.filter(instruction => instruction.id !== id);
}
