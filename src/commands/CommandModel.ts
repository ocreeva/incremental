import type { CommandId } from '@/constants';
import type { EntityId, GameModel, OperationState, TimeContext, UpdateContext } from '@/types';

abstract class CommandModel implements GameModel<OperationState> {
    public readonly state: OperationState;

    private elapsed = 0;

    constructor(commandId: CommandId, parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        this.state = {
            id: crypto.randomUUID(),
            commandId,
            parentRoutineId,
            parentSubroutineId,
            delay: 0,
            duration: 42,
            progress: 0,
        };
    }

    public start(_context: UpdateContext, _time: number): void {
        // noop
    }

    public update(_context: UpdateContext, _time: number): void {
        // noop
    }

    public finalize(_context: UpdateContext, _time: number): void {
        // noop
    }

    public progress(context: UpdateContext, time: TimeContext): void {
        this.elapsed += time.delta;
        if (this.elapsed >= this.state.duration) {
            time.delta = this.elapsed - this.state.duration;
            this.elapsed = this.state.duration;
        } else {
            time.delta = 0;
        }

        this.state.progress = 100 * this.elapsed / this.state.duration;
        context.updateOperation(this.state.id, { progress: this.state.progress });
    }
}

export default CommandModel;
