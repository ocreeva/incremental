import { assertIsDefined } from '@/core';

import { RoutineModel } from './RoutineModel';
import { sendUpdateMessage } from './client';

import type { OperationState, SubroutineState } from '@/types';
import type { MessageService } from '@/types/worker';
import type ModelContext from './ModelContext';
import type {
    AsyncModelMessage, ModelMessage,
    CreateRoutineResponse, UpdatePayload
} from './client';

class ModelProcessor implements ModelContext {
    private _lastUpdate: number | undefined;

    public readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;
    public createdOperations: OperationState[] = [];
    public createdSubroutines: SubroutineState[] = [];

    public routine: RoutineModel | undefined;

    constructor(messageService: MessageService<ModelMessage, AsyncModelMessage>) {
        this.messageService = messageService;
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

    public update: () => void
    = () => {
        assertIsDefined(this.routine, `ModelProcessor.update called before routine was created.`);

        const deltaTime = this._snapshotDeltaTime();

        const updates: UpdatePayload = {
            operationUpdates: [ ],
        };
        this.routine.update({ deltaTime }, updates);
        sendUpdateMessage(this.messageService, updates);
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
