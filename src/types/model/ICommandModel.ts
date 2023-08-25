import type { CommandId } from '@/constants';
import type { EntityId, InstructionState } from '@/types';

import type IDeltaValue from './IDeltaValue';
import type IEntityModel from './IEntityModel';

declare interface ICommandModel extends Omit<IEntityModel, 'update'> {
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
        instruction: InstructionState,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId,
    ) => Promise<EntityId>;

    update(time: IDeltaValue, completion: IDeltaValue): void;
}

export default ICommandModel;
