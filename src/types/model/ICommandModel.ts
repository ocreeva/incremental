import type { ModelStatus } from '@/constants/worker';
import type { EntityId, InstructionState } from '@/types';
import type { IEventable } from '@/types/event';

import type IDeltaValue from './IDeltaValue';
import type IGameContext from './IGameContext';
import { CommandId } from '@/constants';

export declare interface ICommandModelEventable {
    /** The command's level. */
    readonly level: number;

    /** The command's sublevel (tiered progress to next level). */
    readonly sublevel: number;
}

declare interface ICommandModel extends ICommandModelEventable, IEventable<ICommandModelEventable> {
    /** The command's ID. */
    readonly id: CommandId;

    /** The model's status. */
    readonly status: ModelStatus;

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

export default ICommandModel;
