import AsyncWorkerService from '@/services/AsyncWorkerService';

import ModelProcessor from './ModelProcessor';
import {
    AsyncModelMessage, ModelMessage,
    prepareToCreateRoutine,
    sendUpdateMessage,
} from './client';

import type { PayloadMessage, PayloadMessageAction } from '@/types/worker';

const postMessageAction: PayloadMessageAction = (message) => self.postMessage(message);

const asyncWorkerService = new AsyncWorkerService<AsyncModelMessage>(postMessageAction);
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

        case ModelMessage.Start:
            modelProcessor.start();
            break;

        case ModelMessage.Stop:
            modelProcessor.stop();
            break;

        case ModelMessage.Tick:
            const updates = modelProcessor.update();
            sendUpdateMessage(postMessageAction, updates);
            break;

        default:
            console.warn(`gameLoopWorker.onmessage received message with unhandled type (${type}).`);
    }
};
