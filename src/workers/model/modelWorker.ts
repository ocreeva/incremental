import WorkerMessageService from '@/services/WorkerMessageService';

import ModelProcessor from './ModelProcessor';
import {
    AsyncModelMessage, ModelMessage,
    prepareToCreateRoutine,
} from './client';

import type { PayloadMessage, PayloadMessageAction } from '@/types/worker';

const postMessageAction: PayloadMessageAction = (message) => self.postMessage(message);

const messageService = new WorkerMessageService<ModelMessage, AsyncModelMessage>(postMessageAction);
const modelProcessor = new ModelProcessor(messageService);

self.onmessage = ({ data: message }) => {
    // give the WorkerMessageService a chance to handle any two-way message responses
    if (messageService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage;
    switch (type as AsyncModelMessage | ModelMessage) {
        case AsyncModelMessage.CreateRoutine:{
            const [{ payload: { scriptId } }, respond] = prepareToCreateRoutine(message);
            modelProcessor.createRoutineAsync(scriptId)
                .then(response => respond(messageService, response));
            break;
        }

        case ModelMessage.Start:
            modelProcessor.start();
            break;

        case ModelMessage.Stop:
            modelProcessor.stop();
            break;

        case ModelMessage.Tick:
            modelProcessor.update();
            break;

        default:
            console.warn(`gameLoopWorker.onmessage received message with unhandled type (${type}).`);
    }
};
