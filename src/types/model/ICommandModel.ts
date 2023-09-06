import type { ModelStatus } from '@/constants/worker';
import type { CommandState, EntityId, InstructionState } from '@/types';

import type IDeltaValue from './IDeltaValue';
import type IGameContext from './IGameContext';

declare interface _ICommandModel {
    /** The model's status. */
    readonly status: ModelStatus;

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

    initializeAsync(game: IGameContext): Promise<void>;

    start(operationId: EntityId, time: number): void;
    synchronize(time: number): void;
    finalize(operationId: EntityId, time: number): void;
    abort(operationId: EntityId, time: number): void;

    update(completion: IDeltaValue, operationId: EntityId, time: number): void;
}

declare type ICommandModel = {
    [P in keyof CommandState]-?: NonNullable<CommandState[P]>;
} & _ICommandModel;

export default ICommandModel;
