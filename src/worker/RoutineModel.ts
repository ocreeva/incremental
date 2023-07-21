import type { EntityId, RoutineState, TimeContext, UpdateContext } from '@/types';

import ConceptModel from './ConceptModel';
import type ModelContext from './ModelContext';
import SubroutineModel, { SubroutineStatus } from './SubroutineModel';

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel extends ConceptModel<RoutineState>
{
    private readonly subroutines: SubroutineModel[];

    private constructor(state: RoutineState, subroutines: SubroutineModel[]) {
        super(state);
        this.subroutines = subroutines;
    }

    public override start(context: UpdateContext) {
        context.setRoutine(this.state);
        this.subroutines.forEach(subroutine => subroutine.start(context));
    }

    public override update(context: UpdateContext) {
        for (let index = 0; index < this.subroutines.length; index++) {
            const subroutine = this.subroutines[index];
            switch (subroutine.status) {
                case SubroutineStatus.active:
                    subroutine.update(context);
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

    public static createAsync: (context: ModelContext, scriptId: EntityId) => Promise<RoutineModel>
    = async (context, scriptId) => {
        const subroutine = await SubroutineModel.createAsync(context, scriptId);
        return new RoutineModel({
            id: crypto.randomUUID(),
            subroutines: [ subroutine.state.id ],
            duration: subroutine.state.duration,
        }, [ subroutine ]);
    };
}
