import type { AsyncModelMessage, ModelMessage } from '@/constants/worker';
import type { EntityId } from '@/types';
import type { MessageService } from '@/types/worker';

import type IGameSynchronization from './IGameSynchronization';
import type IOperationModel from './IOperationModel';
import type IRoutineModel from './IRoutineModel';
import type ISubroutineModel from './ISubroutineModel';

/**
 * Represents contextual information about the state of the game.
 */
declare interface IGameContext {
    /** A worker message service. */
    readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;

    /** The operation models. */
    readonly operations: Map<EntityId, IOperationModel>;

    /** The routine model. */
    readonly routine: IRoutineModel;

    /** The subroutine models. */
    readonly subroutines: Map<EntityId, ISubroutineModel>;

    /** The game's synchronization. */
    readonly synchronization: IGameSynchronization;

    /**
     * Get an operation by ID.
     * 
     * @param operationId - The operation's ID.
     * 
     * @returns The operation.
     * 
     * @remarks
     * Wrapper around 'operations.get' with an assert for existence.
     */
    getOperation(operationId: EntityId): IOperationModel;

    /**
     * Get a subroutine by ID.
     * 
     * @param subroutineId - The subroutine's ID.
     * 
     * @returns The subroutine.
     * 
     * @remarks
     * Wrapper around 'subroutines.get' with an assert for existence.
     */
    getSubroutine(subroutineId: EntityId): ISubroutineModel;
}

export default IGameContext;
