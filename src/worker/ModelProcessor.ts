import { EntityId } from '@reduxjs/toolkit';

import { MessageId } from '@/constants';
import { ModelStatus, AsyncModelMessage, ModelMessage } from '@/constants/worker';
import { MessageService } from '@/types/worker';
import { CreateRoutineResponse, sendUpdateMessage } from '@/worker/client';

import GameContext from './GameContext';
import GameSynchronization from './GameSynchronization';
import TimeContext from './TimeContext';

class ModelProcessor {
    private readonly game: GameContext;
    private readonly synchronization: GameSynchronization = new GameSynchronization();
    private readonly time: TimeContext;

    constructor(messageService: MessageService<ModelMessage, AsyncModelMessage>) {
        this.game = new GameContext(messageService, this.synchronization);
        this.time = new TimeContext(this.game);
    }

    public async initializeAsync(): Promise<void> {
        await Promise.all(Object.values(this.game.commands).map(command => command.initializeAsync(this.game)));
        this.synchronizeAllCommands();

        if (this.synchronization.hasUpdates()) {
            sendUpdateMessage(this.game.messageService, this.synchronization.getUpdatePayload());
        }

        // BUGBUG: other ModelProcessor methods can be invoked before initializeAsync completes
    }

    public async createRoutineAsync(scriptId: EntityId): Promise<CreateRoutineResponse> {
        this.game.reset();
        this.time.reset();

        await this.game.routine.initializeAsync(this.game, scriptId);
        this.game.routine.maxDuration = this.time.maxDuration;
        this.game.routine.start(this.time.total);

        return this.synchronization.getCreatePayload();
    }

    public reset(): void {
        this.game.reset();

        Object.values(this.game.commands).map(command => command.reset());
    }

    public start(): void {
        this.time.snapshot();
    }

    public update(): void {
        const timeDelta = this.time.snapshot();

        this.game.routine.update(timeDelta);
        this.game.routine.synchronize(this.time.total);
        this.synchronizeAllCommands();

        if (this.time.hasExpired) {
            this.synchronization.routineIsComplete = true;
        }

        if (this.synchronization.hasUpdates()) {
            sendUpdateMessage(this.game.messageService, this.synchronization.getUpdatePayload());
        }
    }

    public finalize(): void {
        switch (this.game.routine.status) {
            case ModelStatus.complete:
                this.game.routine.finalize(this.time.total);
                break;

            case ModelStatus.idle:
                break;

            default:
                this.game.routine.abort(
                    this.time.total,
                    this.time.hasExpired ? MessageId.RoutineTimeElapsed : MessageId.RoutineStopped);
                break;
        }

        this.synchronizeAllCommands();

        if (this.synchronization.hasUpdates()) {
            sendUpdateMessage(this.game.messageService, this.synchronization.getUpdatePayload());
        }
    }

    private synchronizeAllCommands(): void {
        Object.values(this.game.commands).forEach(command => command.synchronize(this.time.total));
    }
}

export default ModelProcessor;
