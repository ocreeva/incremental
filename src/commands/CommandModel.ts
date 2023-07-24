import type { CommandId } from '@/constants';
import type { GameModel, OperationState, TimeContext, UpdateContext } from '@/types';

abstract class CommandModel implements GameModel<OperationState> {
    public readonly state: OperationState;

    private elapsed = 0;

    constructor(commandId: CommandId) {
        this.state = {
            id: crypto.randomUUID(),
            commandId,
            duration: 42,
            progress: 0,
        };
    }

    public start(_context: UpdateContext): void {
        // noop
    }

    public update(_context: UpdateContext): void {
        // noop
    }

    public finalize(_context: UpdateContext): void {
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
