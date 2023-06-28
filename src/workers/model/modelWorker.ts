import AsyncWorkerService from '@/services/AsyncWorkerService';

import ModelProcessor from './ModelProcessor';
import {
    AsyncModelMessage, ModelMessage,
    prepareToCreateRoutine,
} from './client';

import type { PayloadMessage } from '@/types/worker';

const asyncWorkerService = new AsyncWorkerService<AsyncModelMessage>(message => self.postMessage(message));
const modelProcessor = new ModelProcessor(asyncWorkerService);

self.onmessage = ({ data: message }) => {
    // give the AsyncWorkerService a chance to handle any asynchronous responses
    if (asyncWorkerService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage;
    switch (type as AsyncModelMessage | ModelMessage) {
        case AsyncModelMessage.CreateRoutine:{
            const [{ payload: { scriptId } }, respond] = prepareToCreateRoutine(message);
            modelProcessor.createRoutineAsync(scriptId)
                .then(response => respond(asyncWorkerService, response));
            break;
        }

        // case GameLoopMessageType.Tick:
        //     const { deltaTime } = payload;
        //     const routineStateUpdate = routineProcessor.update(deltaTime);
        //     if (routineStateUpdate !== undefined) {
        //         postAction(GameLoopMessageType.UpdateState, { routineStateUpdate });
        //     }

        //     break;

        default:
            console.warn(`gameLoopWorker.onmessage received message with unhandled type (${type}).`);
    }
};
