import type { EntityId, GameModel, RoutineState, SubroutineState, TimeContext, UpdateContext } from '@/types';

import type ModelContext from './ModelContext';
import SubroutineModel, { SubroutineStatus } from './SubroutineModel';

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel implements GameModel<RoutineState>
{
    private readonly subroutines: SubroutineModel[] = [
        new SubroutineModel(),
        new SubroutineModel(),
        new SubroutineModel(),
        new SubroutineModel(),
    ];

    public constructor() {
        this.state = {
            id: crypto.randomUUID(),
            subroutines: this.subroutines.map(subroutine => subroutine.state.id),
            duration: 0,
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

    public start(context: UpdateContext) {
        context.setRoutine(this.state);
        for (const subroutine of this.subroutines) {
            context.addSubroutine(subroutine.state);
            switch (subroutine.status) {
                case SubroutineStatus.pending:
                    subroutine.start(context);
                    this.state.duration = Math.max(this.state.duration, subroutine.state.duration);
                    break;
            }
        }
    }

    public update(context: UpdateContext) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                    subroutine.update(context);
                    break;
            }
        }
    }

    public finalize(context: UpdateContext) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                    subroutine.finalize(context);
                    break;
            }
        }
    }

    public progress(context: UpdateContext, time: TimeContext) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active: {
                    const timeContext: TimeContext = { delta: time.delta, total: time.total };
                    subroutine.progress(context, timeContext);
                    if (timeContext.delta > 0) {
                        subroutine.finalize(context);
                    }
                    break;
                }
            }
        }
    }
}
