import { CommandId, InstructionState } from '@/types';

export const createInstruction: (commandId: CommandId) => InstructionState
= (commandId) => ({
    id: crypto.randomUUID(),
    commandId,
});
