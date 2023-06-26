import { CommandId, InstructionState } from '@/types';

export const createInstruction: (commandId: CommandId) => InstructionState
= (commandId) => { return {
    id: crypto.randomUUID(),
    commandId,
}; };
