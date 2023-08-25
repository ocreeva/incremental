import commands from '@/commands/models';
import { type AsyncModelMessage, type ModelMessage } from '@/constants/worker';
import type { EntityId } from '@/types';
import type { MessageService } from '@/types/worker';
import { type CreateRoutineResponse, sendUpdateMessage } from '@/worker/client';

import GameContext from './GameContext';
import GameSynchronization from './GameSynchronization';
import TimeContext from './TimeContext';

class ModelProcessor {
    private readonly game: GameContext;
    private readonly synchronization: GameSynchronization = new GameSynchronization();
    private readonly time: TimeContext = new TimeContext();

    private hasInitializedCommands = false;

    constructor(messageService: MessageService<ModelMessage, AsyncModelMessage>) {
        this.game = new GameContext(messageService, this.synchronization);
    }

    public async createRoutineAsync(scriptId: EntityId): Promise<CreateRoutineResponse> {
        this.game.reset();
        this.time.reset();

        if (!this.hasInitializedCommands) {
            await Promise.all(Object.values(commands).map(command => command.initializeAsync(this.game)));
            this.hasInitializedCommands = true;
        }

        await this.game.routine.initializeAsync(this.game, scriptId);
        this.game.routine.start(this.time.total);

        return this.synchronization.getCreatePayload();
    }

    public start(): void {
        this.time.snapshot();
    }

    public update(): void {
        const timeDelta = this.time.snapshot();

        this.game.routine.update(timeDelta);
        this.game.routine.synchronize(this.time.total);

        if (this.synchronization.hasUpdates()) {
            sendUpdateMessage(this.game.messageService, this.synchronization.getUpdatePayload());
        }
    }

    public finalize(): void {
        if (this.game.synchronization.routineIsComplete) {
            this.game.routine.finalize(this.time.total);
        } else {
            this.game.routine.abort(this.time.total);
        }

        if (this.synchronization.hasUpdates()) {
            sendUpdateMessage(this.game.messageService, this.synchronization.getUpdatePayload());
        }
    }
}

export default ModelProcessor;
