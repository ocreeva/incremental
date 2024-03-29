import { EntityId } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { InstructionData } from '@/types';
import { IEventable } from '@/types/event';

import IEntityModel from './IEntityModel';

export declare interface ICommandModelEventable {
    /** The command's level. */
    readonly level: number;

    /** The command's sublevel (tiered progress to next level). */
    readonly sublevel: number;
}

declare interface ICommandModel extends ICommandModelEventable, IEntityModel<void, EntityId>, IEventable<ICommandModelEventable> {
    /** The command's ID. */
    readonly id: CommandId;

    /**
     * Create an operation executing an instruction for this command.
     * 
     * @param instruction - The instruction.
     * @param parentRoutineId - The parent routine's ID.
     * @param parentSubroutineId - The parent subroutine's ID.
     * 
     * @returns The operation's ID.
     */
    createOperationAsync: (
        instruction: InstructionData,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId,
    ) => Promise<EntityId>;

    reset: () => void;
}

export default ICommandModel;
