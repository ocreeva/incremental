import type { EntityId } from '@reduxjs/toolkit';
import type { CommandId, InstructionState } from '@/types';

export const createInstruction: (commandId: CommandId, parentScriptId: EntityId) => InstructionState
= (commandId, parentScriptId) => ({
    id: crypto.randomUUID(),
    commandId,
    parentScriptId,
});
