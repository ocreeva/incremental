import type { EntityId, GameModel, RoutineState, TimeContext, UpdateContext } from '@/types';

import ConceptModel from './ConceptModel';
import type ModelContext from './ModelContext';
import SubroutineModel, { SubroutineStatus } from './SubroutineModel';

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel extends ConceptModel<RoutineState>
{
    private readonly subroutines: SubroutineModel[] = [
        new SubroutineModel(),
        new SubroutineModel(),
        new SubroutineModel(),
        new SubroutineModel(),
    ];

    public constructor() {
        super({
            id: crypto.randomUUID(),
            subroutines: [],
            duration: 0,
        });
    }

    public async allocateSubroutineAsync(context: ModelContext, scriptId: EntityId): Promise<GameModel> {
        for (const subroutine of this.subroutines) {
            switch (subroutine.status) {
                case SubroutineStatus.idle: {
                    await subroutine.loadScriptAsync(context, scriptId);
                    return subroutine;
                }
            }
        }

        throw Error('Unable to allocate a new subroutine.');
    }

    public override start(context: UpdateContext) {
        context.setRoutine(this.state);
        for (const subroutine of this.subroutines) {
            switch (subroutine.status) {
                case SubroutineStatus.pending:
                    subroutine.start(context);
                    this.state.subroutines.push(subroutine.state.id);
                    this.state.duration = Math.max(this.state.duration, subroutine.state.duration);
                    break;
            }
        }
    }

    public override update(context: UpdateContext) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                    subroutine.update(context);
                    if (!this.state.subroutines.includes(subroutine.state.id)) {
                        this.state.subroutines.push(subroutine.state.id);
                        context.updateRoutine({ subroutines: this.state.subroutines });
                    }
                    break;
            }
        }
    }

    public override finalize(context: UpdateContext) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                    subroutine.finalize(context);
                    break;
            }
        }
    }

    public override progress(context: UpdateContext, time: TimeContext) {
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
