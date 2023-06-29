import { assertIsDefined } from '@/core';

import { RoutineModel } from './RoutineModel';

import type { OperationState, SubroutineState } from '@/types';
import type { AsyncRequestProvider } from '@/types/worker';
import type ModelContext from './ModelContext';
import type { AsyncModelMessage, CreateRoutineResponse, UpdatePayload } from './client';

class ModelProcessor implements ModelContext {
    private _lastUpdate: number | undefined;

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

    public start: () => void
    = () => {
        this._snapshotDeltaTime();
    };

    public stop: () => void
    = () => { };

    public update: () => UpdatePayload
    = () => {
        assertIsDefined(this.routine, `ModelProcessor.update called before routine was created.`);

        const deltaTime = this._snapshotDeltaTime();

        const updates: UpdatePayload = {
            operationUpdates: [ ],
        };
        this.routine.update({ deltaTime }, updates);
        return updates;
    };

    private static _convertTimeToGameUnits: (time: number) => number
    = (time) => time * 0.05;

    private _snapshotDeltaTime: () => number
    = () => {
        const now = performance.now();

        if (this._lastUpdate === undefined) {
            this._lastUpdate = now;
            return 0;
        }

        const deltaTime = now - this._lastUpdate;
        this._lastUpdate = now;
        return ModelProcessor._convertTimeToGameUnits(deltaTime);
    };
}

export default ModelProcessor;
