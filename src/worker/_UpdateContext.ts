import { crash } from '@/core';
import type { EntityId, GameModel, OperationState, RoutineState, SubroutineState, Update, UpdateContext } from '@/types';

import { type CreateRoutineResponse, type UpdatePayload } from './client';
import ModelProcessor from './ModelProcessor';

class _UpdateContext implements UpdateContext {
    private readonly processor: ModelProcessor;

    private readonly operationCreates: OperationState[] = [];
    private readonly operationUpdates: Map<EntityId, Partial<OperationState>> = new Map<EntityId, Partial<OperationState>>();

    private readonly subroutineCreates: SubroutineState[] = [];
    private readonly subroutineUpdates: Map<EntityId, Partial<SubroutineState>> = new Map<EntityId, Partial<SubroutineState>>();

    private routine: RoutineState | undefined;
    private routineUpdate: Partial<RoutineState> | undefined;

    public constructor(processor: ModelProcessor) {
        this.processor = processor;
    }

    public getCreatePayload(): CreateRoutineResponse {
        return {
            operations: this.operationCreates,
            routine: this.routine || crash(`UpdateContext.getCreatePayload was called without receiving a Routine.`),
            subroutines: this.subroutineCreates,
        }
    }

    public getUpdatePayload(): UpdatePayload {
        const operationUpdatesArray: Update<OperationState>[] = [];
        for (const [id, changes] of this.operationUpdates) {
            operationUpdatesArray.push({ id, changes });
        }

        const subroutineUpdatesArray: Update<SubroutineState>[] = [];
        for (const [id, changes] of this.subroutineUpdates) {
            subroutineUpdatesArray.push({ id, changes });
        }

        return {
            operationCreates: this.operationCreates,
            operationUpdates: operationUpdatesArray,
            routineUpdate: this.routineUpdate,
            subroutineCreates: this.subroutineCreates,
            subroutineUpdates: subroutineUpdatesArray,
        };
    }

    public hasUpdates(): boolean {
        return this.operationCreates.length > 0
            || this.operationUpdates.size > 0
            || this.subroutineCreates.length > 0
            || this.subroutineUpdates.size > 0
            || this.routine !== undefined
            || this.routineUpdate !== undefined;
    }

    public addOperation(operation: OperationState): void {
        this.operationCreates.push(operation);
    }

    public addSubroutine(subroutine: SubroutineState): void {
        this.subroutineCreates.push(subroutine);
    }

    public allocateSubroutineAsync(scriptId: EntityId): Promise<GameModel> {
        return this.processor.allocateSubroutineAsync(scriptId);
    }

    public setRoutine(routine: RoutineState): void {
        this.routine = routine;
    }

    public updateOperation(id: EntityId, update: Partial<OperationState>): void {
        if (this.operationUpdates.has(id)) {
            const previous = this.operationUpdates.get(id);
            this.operationUpdates.set(id, { ...previous, ...update });
        } else {
            this.operationUpdates.set(id, update);
        }
    }

    public updateRoutine(update: Partial<RoutineState>): void {
        this.routineUpdate = { ...this.routineUpdate, ...update };
    }

    public updateSubroutine(id: EntityId, update: Partial<SubroutineState>): void {
        if (this.subroutineUpdates.has(id)) {
            const previous = this.subroutineUpdates.get(id);
            this.subroutineUpdates.set(id, { ...previous, ...update });
        } else {
            this.subroutineUpdates.set(id, update);
        }
    }
}

export default _UpdateContext;
