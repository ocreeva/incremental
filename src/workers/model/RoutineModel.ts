import ConceptModel from './ConceptModel';
import { SubroutineModel } from './SubroutineModel';

import type { RoutineState } from '@/types';
import type ModelContext from './ModelContext';
import type { OperationUpdates } from './OperationModel';
import type UpdateContext from './UpdateContext';

/**
 * Provides the gameplay model for a Routine.
 */
export class RoutineModel extends ConceptModel<RoutineState>
{
    public readonly subroutines: SubroutineModel[];

    constructor(state: RoutineState, subroutines: SubroutineModel[]) {
        super(state);
        this.subroutines = subroutines;
    }

    public static createAsync: (context: ModelContext, scriptId: string) => Promise<RoutineModel>
    = async (context, scriptId) => {
        const subroutine = await SubroutineModel.createAsync(context, scriptId);
        return new RoutineModel({
            id: crypto.randomUUID(),
            subroutines: [ subroutine.state.id ],
            duration: subroutine.state.duration,
        }, [ subroutine ]);
    };

    public update: (context: UpdateContext, updates: OperationUpdates) => void
    = (context, updates) => {
        this.subroutines[0].update(context, updates);
    };

}
