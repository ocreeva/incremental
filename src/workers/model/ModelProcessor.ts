import { RoutineModel } from './RoutineModel';

import type { OperationState, SubroutineState } from '@/types';
import type { AsyncRequestProvider } from '@/types/worker';
import type ModelContext from './ModelContext';
import type { AsyncModelMessage, CreateRoutineResponse } from './client';

class ModelProcessor implements ModelContext {
    public readonly mainThread: AsyncRequestProvider<AsyncModelMessage>;
    public createdOperations: OperationState[] = [];
    public createdSubroutines: SubroutineState[] = [];

    public routine: RoutineModel | undefined;

    constructor(asyncRequestProvider: AsyncRequestProvider<AsyncModelMessage>) {
        this.mainThread = asyncRequestProvider;
    }

    public createRoutineAsync: (scriptId: string) => Promise<CreateRoutineResponse>
    = async (scriptId) => {
        this.routine = await RoutineModel.createAsync(this, scriptId);
        const result: CreateRoutineResponse = {
            operations: this.createdOperations,
            subroutines: this.createdSubroutines,
            routine: this.routine.state,
        };

        this.createdOperations = [];
        this.createdSubroutines = [];

        return result;
    };
}

export default ModelProcessor;
