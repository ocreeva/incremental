import type { CommandState, EntityId, InstructionState } from '@/types';

import type IDeltaValue from './IDeltaValue';
import type IEntityModel from './IEntityModel';

declare interface _ICommandModel extends Omit<IEntityModel, 'update'> {
    /** The command's sublevel (partial progress to next level). */
    readonly sublevel: number;

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
        instruction: InstructionState,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId,
    ) => Promise<EntityId>;

    update(time: IDeltaValue, completion: IDeltaValue): void;
}

declare type ICommandModel = {
    [P in keyof CommandState]-?: NonNullable<CommandState[P]>;
} & Omit<IEntityModel, 'update'> & _ICommandModel;

export default ICommandModel;
