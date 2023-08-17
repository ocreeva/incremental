import { assertIsDefined } from '@/core';
import type { EntityId, GameContext, GameModel, SubroutineState } from '@/types';
import type { MessageService } from '@/types/worker';

import {
    type AsyncModelMessage,
    type CreateRoutineResponse,
    type ModelMessage,
    sendUpdateMessage
} from './client';
import _GameContext from './_GameContext';
import TimeContext from './_TimeContext';
import UpdateContext from './_UpdateContext';
import ModelContext from './ModelContext';
import { RoutineModel } from './RoutineModel';

class ModelProcessor implements ModelContext {
    private readonly timeContext: TimeContext = new TimeContext();
    private gameContext?: GameContext;

    constructor(messageService: MessageService<ModelMessage, AsyncModelMessage>) {
        this.messageService = messageService;
    }

    public readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;

    public routine: RoutineModel | undefined;

    public allocateSubroutineAsync(scriptId: EntityId): Promise<GameModel<SubroutineState>> {
        assertIsDefined(this.routine, `ModelProcessor.allocateSubroutineAsync called before routine was created.`);

        return this.routine.allocateSubroutineAsync(this, scriptId);
    }

    public async createRoutineAsync(scriptId: EntityId): Promise<CreateRoutineResponse> {
        if (this.gameContext === undefined) {
            this.gameContext = await _GameContext.createAsync(this);
        }

        this.routine = new RoutineModel();
        await this.routine.allocateSubroutineAsync(this, scriptId, true);

        const updateContext = new UpdateContext(this);
        this.routine.start(this.gameContext, updateContext, 0);

        return updateContext.getCreatePayload();
    }

    public start(): void {
        assertIsDefined(this.gameContext, 'ModelProcessor.start called before game context was created.');
        assertIsDefined(this.routine, `ModelProcessor.start called before routine was created.`);

        this.timeContext.snapshot();
    }

    public update(): void {
        assertIsDefined(this.gameContext, 'ModelProcessor.update called before game context was created.');
        assertIsDefined(this.routine, `ModelProcessor.update called before routine was created.`);

        this.timeContext.snapshot();

        const updateContext = new UpdateContext(this);
        this.routine.progress(this.gameContext, updateContext, this.timeContext);
        this.routine.update(this.gameContext, updateContext, this.timeContext.total);

        if (updateContext.hasUpdates()) {
            sendUpdateMessage(this.messageService, updateContext.getUpdatePayload());
        }
    }

    public finalize(): void {
        assertIsDefined(this.gameContext, 'ModelProcessor.finalize called before game context was created.');
        assertIsDefined(this.routine, `ModelProcessor.finalize called before routine was created.`);

        this.timeContext.reset();

        const updateContext = new UpdateContext(this);
        this.routine.finalize(this.gameContext, updateContext, this.timeContext.total);

        if (updateContext.hasUpdates()) {
            sendUpdateMessage(this.messageService, updateContext.getUpdatePayload());
        }
    }
}

export default ModelProcessor;
