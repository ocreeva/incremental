import { assertIsDefined } from '@/core';
import type { EntityId, GameModel } from '@/types';
import type { MessageService } from '@/types/worker';

import {
    type AsyncModelMessage,
    type CreateRoutineResponse,
    type ModelMessage,
    sendUpdateMessage
} from './client';
import TimeContext from './_TimeContext';
import UpdateContext from './_UpdateContext';
import ModelContext from './ModelContext';
import { RoutineModel } from './RoutineModel';

class ModelProcessor implements ModelContext {
    private readonly timeContext: TimeContext = new TimeContext();

    constructor(messageService: MessageService<ModelMessage, AsyncModelMessage>) {
        this.messageService = messageService;
    }

    public readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;

    public routine: RoutineModel | undefined;

    public allocateSubroutineAsync(scriptId: EntityId): Promise<GameModel> {
        assertIsDefined(this.routine, `ModelProcessor.allocateSubroutineAsync called before routine was created.`);

        return this.routine.allocateSubroutineAsync(this, scriptId);
    }

    public async createRoutineAsync(scriptId: EntityId): Promise<CreateRoutineResponse> {
        this.routine = new RoutineModel();
        await this.routine.allocateSubroutineAsync(this, scriptId);

        const updateContext = new UpdateContext(this);
        this.routine.start(updateContext);

        return updateContext.getCreatePayload();
    }

    public start(): void {
        assertIsDefined(this.routine, `ModelProcessor.start called before routine was created.`);

        this.timeContext.snapshot();
    }

    public update(): void {
        assertIsDefined(this.routine, `ModelProcessor.update called before routine was created.`);

        this.timeContext.snapshot();

        const updateContext = new UpdateContext(this);
        this.routine.progress(updateContext, this.timeContext);
        this.routine.update(updateContext);

        if (updateContext.hasUpdates()) {
            sendUpdateMessage(this.messageService, updateContext.getUpdatePayload());
        }
    }

    public finalize(): void {
        assertIsDefined(this.routine, `ModelProcessor.finalize called before routine was created.`);

        this.timeContext.reset();

        const updateContext = new UpdateContext(this);
        this.routine.finalize(updateContext);

        if (updateContext.hasUpdates()) {
            sendUpdateMessage(this.messageService, updateContext.getUpdatePayload());
        }
    }
}

export default ModelProcessor;
