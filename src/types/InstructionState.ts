import type { CommandId } from '@/constants';

import type EntityState from './EntityState';
import type EntityId from './EntityId';

/**
 * Provides the UI state for an Instruction.
 */
declare type InstructionState = EntityState & {
    /** The command's ID. */
    commandId: CommandId;
    /** The parent script's ID. */
    parentScriptId: EntityId;

    /** The instruction's target. (optional) */
    targetEntityId?: EntityId;
};

export default InstructionState;
