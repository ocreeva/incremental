import { type CommandId } from '@/constants';
import { assert } from '@/core';
import type { OperationState, SubroutineState, EntityId, RoutineState, CommandState } from '@/types';
import type { IGameSynchronization } from '@/types/model';
import { UpdatePayload, type CreateRoutineResponse } from '@/worker/client';

class GameSynchronization implements IGameSynchronization {
    private commandUpserts: Map<CommandId, CommandState> = new Map<CommandId, CommandState>;

    private operations: Map<EntityId, OperationState> = new Map<EntityId, OperationState>;
    private operationUpdates: Map<EntityId, Partial<OperationState>> = new Map<EntityId, Partial<OperationState>>;

    private routine: RoutineState | undefined = undefined;
    private routineUpdate: Partial<RoutineState> | undefined = undefined;

    private subroutines: Map<EntityId, SubroutineState> = new Map<EntityId, SubroutineState>;
    private subroutineUpdates: Map<EntityId, Partial<SubroutineState>> = new Map<EntityId, Partial<SubroutineState>>;

    public routineIsComplete = false;

    public addOperation(operation: OperationState): void {
        this.operations.set(operation.id, operation);
        this.operationUpdates.delete(operation.id);
    }

    public addSubroutine(subroutine: SubroutineState): void {
        this.subroutines.set(subroutine.id, subroutine);
        this.subroutineUpdates.delete(subroutine.id);
    }

    public getCreatePayload(): CreateRoutineResponse {
        assert(this.commandUpserts.size === 0, "Unexpected command upserts during routine creation.");
        assert(this.operationUpdates.size === 0, "Unexpected operation updates during routine creation.");
        assert(this.routineUpdate === undefined, "Unexpected routine update during routine creation.");
        assert(this.subroutineUpdates.size === 0, "Unexpected subroutine updates during routine creation.");
        assert(!this.routineIsComplete, "Unexpected routine completion during routine creation.");

        assert(this.routine, "No routine during routine creation.");

        const response: CreateRoutineResponse = {
            operations: Array.from(this.operations.values()),
            routine: this.routine,
            subroutines: Array.from(this.subroutines.values()),
        };

        // reset the relevant state
        this.routine = undefined;
        this.subroutines.clear();
        this.operations.clear();

        return response;
    }

    public getUpdatePayload(): UpdatePayload {
        assert(!this.routine, "Unexpected new routine during routine update.");

        const response: UpdatePayload = {
            commandUpserts: Array.from(this.commandUpserts.values()),
            operations: Array.from(this.operations.values()),
            operationUpdates: Array.from(this.operationUpdates.entries()).map(([id, changes]) => ({ id, changes })),
            routineIsComplete: this.routineIsComplete,
            routineUpdate: this.routineUpdate,
            subroutines: Array.from(this.subroutines.values()),
            subroutineUpdates: Array.from(this.subroutineUpdates.entries()).map(([id, changes]) => ({ id, changes })),
        }

        // reset the relevant state
        this.commandUpserts.clear();
        this.operations.clear();
        this.operationUpdates.clear();
        this.routineUpdate = undefined;
        this.subroutines.clear();
        this.subroutineUpdates.clear();

        return response;
    }

    public hasUpdates(): boolean {
        return this.commandUpserts.size > 0
            || this.operations.size > 0
            || this.operationUpdates.size > 0
            || this.routineUpdate !== undefined
            || this.subroutines.size > 0
            || this.subroutineUpdates.size > 0;
    }

    public setRoutine(routine: RoutineState): void {
        this.reset();

        this.routine = routine;
    }

    public updateOperation(id: EntityId, update: Partial<OperationState>): void {
        if (this.operations.has(id)) {
            const operation = this.operations.get(id);
            assert(operation);
            this.operations.set(id, { ...operation, ...update });
        } else if (this.operationUpdates.has(id)) {
            const previous = this.operationUpdates.get(id);
            this.operationUpdates.set(id, { ...previous, ...update });
        } else {
            this.operationUpdates.set(id, update);
        }
    }

    public updateRoutine(update: Partial<RoutineState>): void {
        if (this.routine) {
            this.routine = { ...this.routine, ...update };
        } else {
            this.routineUpdate = { ...this.routineUpdate, ...update };
        }
    }

    public updateSubroutine(id: EntityId, update: Partial<SubroutineState>): void {
        if (this.subroutines.has(id)) {
            const subroutine = this.subroutines.get(id);
            assert(subroutine);
            this.subroutines.set(id, { ...subroutine, ...update });
        } else if (this.subroutineUpdates.has(id)) {
            const previous = this.subroutineUpdates.get(id);
            this.subroutineUpdates.set(id, { ...previous, ...update });
        } else {
            this.subroutineUpdates.set(id, update);
        }
    }

    public upsertCommand(command: CommandState): void {
        const { id } = command;
        if (this.commandUpserts.has(id)) {
            const previous = this.commandUpserts.get(id);
            this.commandUpserts.set(id, { ...previous, ...command });
        } else {
            this.commandUpserts.set(id, command);
        }
    }

    private reset(): void {
        this.commandUpserts.clear();

        this.operations.clear();
        this.operationUpdates.clear();

        this.routine = undefined;
        this.routineIsComplete = false;
        this.routineUpdate = undefined;

        this.subroutines.clear();
        this.subroutineUpdates.clear();
    }
}

export default GameSynchronization;
