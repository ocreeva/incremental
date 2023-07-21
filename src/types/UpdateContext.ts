import type EntityId from './EntityId';
import type GameModel from './GameModel';
import type OperationState from './OperationState';
import type RoutineState from './RoutineState';
import type SubroutineState from './SubroutineState';

declare interface UpdateContext {
    addOperation(operation: OperationState): void;
    addSubroutine(subroutine: SubroutineState): void;

    allocateSubroutineAsync(script: EntityId): Promise<GameModel>;

    setRoutine(routine: RoutineState): void;

    updateOperation(id: EntityId, update: Partial<OperationState>): void;
    updateRoutine(update: Partial<RoutineState>): void;
    updateSubroutine(id: EntityId, update: Partial<SubroutineState>): void;
}

export default UpdateContext;
