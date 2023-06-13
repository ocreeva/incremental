import { PayloadAction } from '@reduxjs/toolkit';

import { CommandId, InstructionId } from '@/types';

import { ProgramState } from './programSlice.types';

interface CommandIdPayload {
    commandId: CommandId;
}

interface InstructionIdPayload {
    instructionId: InstructionId;
}

export const addInstruction = ({ currentScript }: ProgramState, { payload: { commandId } }: PayloadAction<CommandIdPayload>): void => {
    const id = crypto.randomUUID();
    currentScript.instructions.push({ id, commandId });
}

export const removeInstruction = ({ currentScript }: ProgramState, { payload: { instructionId } }: PayloadAction<InstructionIdPayload>): void => {
    currentScript.instructions = currentScript.instructions.filter(instruction => instruction.id !== instructionId);
}
