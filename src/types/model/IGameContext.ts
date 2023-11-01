import { EntityId } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { AsyncModelMessage, ModelMessage } from '@/constants/worker';
import { MessageService } from '@/types/worker';

import ICommandModel from './ICommandModel';
import IGameSynchronization from './IGameSynchronization';
import IOperationModel from './IOperationModel';
import IRoutineModel from './IRoutineModel';
import ISubroutineModel from './ISubroutineModel';

/**
 * Represents contextual information about the state of the game.
 */
declare interface IGameContext {
    /** A worker message service. */
    readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;

    /** The command models. */
    readonly commands: Record<CommandId, ICommandModel>;

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
