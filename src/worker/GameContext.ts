import commandModels from '@/commands/models';
import { type CommandId } from '@/constants';
import { type AsyncModelMessage, type ModelMessage } from '@/constants/worker';
import { assert } from '@/core';
import type { EntityId } from '@/types';
import type { ICommandModel, IGameContext, IGameSynchronization, IOperationModel, IRoutineModel, ISubroutineModel } from '@/types/model';
import type { MessageService } from '@/types/worker';

import RoutineModel from './RoutineModel';

class GameContext implements IGameContext {
    public constructor(messageService: MessageService<ModelMessage, AsyncModelMessage>, synchronization: IGameSynchronization) {
        this.messageService = messageService;
        this.synchronization = synchronization;
    }

    public readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;

    public readonly commands: Record<CommandId, ICommandModel> = commandModels;

    public readonly operations: Map<EntityId, IOperationModel> = new Map<EntityId, IOperationModel>;

    public readonly synchronization: IGameSynchronization;

    private _routine: IRoutineModel = new RoutineModel();
    public get routine() { return this._routine; }
    private set routine(routine: IRoutineModel) { this._routine = routine; }

    public readonly subroutines: Map<EntityId, ISubroutineModel> = new Map<EntityId, ISubroutineModel>;

    public getOperation(operationId: EntityId): IOperationModel {
        const operation = this.operations.get(operationId);
        assert(operation, `Operation (${operationId}) not found in game context collection.`);
        return operation;
    }

    public getSubroutine(subroutineId: EntityId): ISubroutineModel {
        const subroutine = this.subroutines.get(subroutineId);
        assert(subroutine, `Subroutine (${subroutineId}) not found in game context collection.`);
        return subroutine;
    }

    public reset(): void {
        this.operations.clear();
        this.subroutines.clear();

        this.routine = new RoutineModel();
    }
}

export default GameContext;
