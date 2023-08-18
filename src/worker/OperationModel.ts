import type { CommandState, EntityId, GameContext, GameModel, OperationState, TimeContext, UpdateContext } from '@/types';

class OperationModel implements GameModel<OperationState> {
    private readonly command: GameModel<CommandState>;
    private elapsed = 0;

    public constructor(command: GameModel<CommandState>, parentRoutineId: EntityId, parentSubroutineId: EntityId) {
        this.state = {
            id: crypto.randomUUID(),
            commandId: command.state.id,
            parentRoutineId,
            parentSubroutineId,
            delay: 0,
            duration: 42,
            progress: 0,
        };

        this.command = command;
    }

    public readonly state: OperationState;

    public start(game: GameContext, context: UpdateContext, time: number): void {
        this.command.start(game, context, time);
    }

    public update(game: GameContext, context: UpdateContext, time: number): void {
        this.command.update(game, context, time);
    }

    public finalize(game: GameContext, context: UpdateContext, time: number): void {
        this.command.finalize(game, context, time);
    }

    public progress(game: GameContext, context: UpdateContext, time: TimeContext): void {
        this.elapsed += time.delta;
        if (this.elapsed >= this.state.duration) {
            time.delta = this.elapsed - this.state.duration;
            this.elapsed = this.state.duration;
        } else {
            time.delta = 0;
        }

        this.state.progress = 100 * this.elapsed / this.state.duration;
        context.updateOperation(this.state.id, { progress: this.state.progress });

        this.command.progress(game, context, time);
    }
}

export default OperationModel;
