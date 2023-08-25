import type { CommandId } from '@/constants';
import type { CommandState, EntityId, OperationState, RoutineState, SubroutineState } from '@/types';
import type { IGameProgress } from '@/types/model';

class GameProgress implements IGameProgress {
    private readonly commandUpserts: Map<CommandId, CommandState> = new Map<CommandId, CommandState>();

    private readonly operationCreates: OperationState[] = [];
    private readonly operationUpdates: Map<EntityId, Partial<OperationState>> = new Map<EntityId, Partial<OperationState>>();

    private readonly subroutineCreates: SubroutineState[] = [];
    private readonly subroutineUpdates: Map<EntityId, Partial<SubroutineState>> = new Map<EntityId, Partial<SubroutineState>>();

    private routine: RoutineState | undefined;
    private routineUpdate: Partial<RoutineState> | undefined;

    public routineIsComplete = false;

    public addOperation(operation: OperationState): void {
        this.operationCreates.push(operation);
    }

    public addSubroutine(subroutine: SubroutineState): void {
        this.subroutineCreates.push(subroutine);
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

    public upsertCommand(command: CommandState): void {
        const { id } = command;
        if (this.commandUpserts.has(id)) {
            const previous = this.commandUpserts.get(id);
            this.commandUpserts.set(id, { ...previous, ...command });
        } else {
            this.commandUpserts.set(id, command);
        }
    }
}

export default GameProgress;
