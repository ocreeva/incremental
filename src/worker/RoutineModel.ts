import type { EntityId, GameContext, GameModel, RoutineState, SubroutineState, TimeContext, UpdateContext } from '@/types';

import type ModelContext from './ModelContext';
import SubroutineModel, { SubroutineStatus } from './SubroutineModel';

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel implements GameModel<RoutineState>
{
    private readonly subroutines: SubroutineModel[];

    public constructor() {
        const id = crypto.randomUUID();

        this.subroutines = [
            new SubroutineModel(id),
            new SubroutineModel(id),
            new SubroutineModel(id),
            new SubroutineModel(id),
        ];

        this.state = {
            id,
            subroutines: this.subroutines.map(subroutine => subroutine.state.id),
            duration: 0,
            elapsed: 0,
        };
    }

    public readonly state: RoutineState;

    public async allocateSubroutineAsync(context: ModelContext, scriptId: EntityId, isBoot = false): Promise<GameModel<SubroutineState>> {
        for (const subroutine of this.subroutines) {
            switch (subroutine.status) {
                case SubroutineStatus.idle: {
                    await subroutine.loadScriptAsync(context, scriptId, isBoot);
                    return subroutine;
                }
            }
        }

        throw Error('Unable to allocate a new subroutine.');
    }

    public start(game: GameContext, context: UpdateContext, time: number) {
        context.setRoutine(this.state);
        for (const subroutine of this.subroutines) {
            context.addSubroutine(subroutine.state);
            switch (subroutine.status) {
                case SubroutineStatus.pending:
                    subroutine.start(game, context, time);
                    this.state.duration = Math.max(this.state.duration, subroutine.state.duration);
                    break;
            }
        }
    }

    public update(game: GameContext, context: UpdateContext, time: number) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                case SubroutineStatus.transition:
                case SubroutineStatus.final:
                    subroutine.update(game, context, time);
                    break;
            }
        }

        const duration = Math.max(...this.subroutines.map(subroutine => subroutine.state.duration));
        if (duration != this.state.duration) {
            this.state.duration = duration;
            context.updateRoutine({ duration });
        }

        context.routineIsComplete = !this.subroutines.some(subroutine => subroutine.status === SubroutineStatus.active || subroutine.status === SubroutineStatus.transition);
    }

    public finalize(game: GameContext, context: UpdateContext, time: number) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                case SubroutineStatus.transition:
                case SubroutineStatus.final:
                    subroutine.finalize(game, context, time);
                    break;
            }
        }
    }

    public progress(game: GameContext, context: UpdateContext, time: TimeContext) {
        this.state.elapsed += time.delta;
        context.updateRoutine({ elapsed: this.state.elapsed });

        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                case SubroutineStatus.transition:
                case SubroutineStatus.final: {
                    const timeContext: TimeContext = { delta: time.delta, total: time.total };
                    subroutine.progress(game, context, timeContext);
                    if (timeContext.delta > 0) {
                        subroutine.finalize(game, context, timeContext.total - timeContext.delta);
                    }
                    break;
                }
            }
        }
    }
}
