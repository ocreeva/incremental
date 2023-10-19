import { EntityId, EntityState } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';

import Entity from './Entity';

/**
 * Provides the persistent state data for an Instruction.
 */
declare type InstructionData = Entity & {
    /** The command's ID. */
    commandId: CommandId;
    /** The parent script's ID. */
    parentScriptId: EntityId;

    /** The instruction's target. (optional) */
    targetEntityId?: EntityId;
};

export declare type InstructionDataState = EntityState<InstructionData>;

export default InstructionData;
