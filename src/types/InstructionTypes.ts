import type { EntityId } from '@reduxjs/toolkit';
import type CommandId from './CommandId';
import type ConceptState from './ConceptState';

/**
 * Provides the UI state for an Instruction.
 * 
 * @id {EntityId} The instructions's unique ID.
 * @commandId {CommandId} The command's ID.
 * @parentScriptId {EntityId} The parent script's ID.
 */
export type InstructionState = ConceptState & {
    commandId: CommandId;
    parentScriptId: EntityId;
};
