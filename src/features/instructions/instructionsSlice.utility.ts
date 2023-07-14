import { type CommandId } from '@/commands';
import { type EntityId, type InstructionState } from '@/types';

export const createInstruction: (commandId: CommandId, parentScriptId: EntityId) => InstructionState
= (commandId, parentScriptId) => ({
    id: crypto.randomUUID(),
    commandId,
    parentScriptId,
});
