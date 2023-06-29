import { crash } from '@/core';

import type { Action } from '@/types';
import type { MessageService, PayloadMessage, PayloadMessageAction } from '@/types/worker';

/**
 * Enumerates message types for the WorkerMessageService.
 */
enum WorkerMessageServiceMessage {
    /**
     * Respond to an asynchronous request.
     */
    RespondToAsyncRequest = 'WorkerMessageService/Respond',
}

declare type AsyncPayloadMessage<TPayload, TMessage extends string> = PayloadMessage<TPayload, TMessage> & {
    requestId: string;
};

/**
 * Provides a service for sending messages across the main/worker thread boundary.
 * 
 * @typeParam TMessage - The type used for one-way message types.
 * @typeParam TAsyncMessage - The type used for two-way message types.
 */
class WorkerMessageService<TMessage extends string, TAsyncMessage extends string>
    implements MessageService<TMessage, TAsyncMessage>
{
    private readonly _postMessage: PayloadMessageAction;
    private readonly _resolvers: { [requestId: string]: Action<any> } = {};

    constructor(postMessage: PayloadMessageAction) {
        this._postMessage = postMessage;
    }

    /**
     * Send a two-way message request.
     * 
     * @typeParam TRequest - The type of the request payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param message - The request message.
     * @returns The response, as a Promise.
     */
    requestAsync: <TRequest, TResponse>(message: PayloadMessage<TRequest, TAsyncMessage>) => Promise<TResponse>
    = <TPayload, TResponse>(message: PayloadMessage<TPayload, TAsyncMessage>) => {
        const requestId = crypto.randomUUID();
        const asyncMessage: AsyncPayloadMessage<TPayload, TAsyncMessage> = { ...message, requestId };
        const promise = new Promise<TResponse>(resolve => this._resolvers[requestId] = resolve);

        this._postMessage(asyncMessage);

        return promise;
    };

    /**
     * Respond to a two-way message.
     * 
     * @typeParam TRequest - The type of the request payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param requestMessage - The request message.
     * @param payload - The response payload.
     */
    respond: <TRequest, TResponse>(requestMessage: PayloadMessage<TRequest, TAsyncMessage>, payload: TResponse) => void
    = <TPayload, TResponse>(requestMessage: PayloadMessage<TPayload, TAsyncMessage>, payload: TResponse) => {
        const { requestId } = requestMessage as AsyncPayloadMessage<TPayload, TAsyncMessage>;
        const message: AsyncPayloadMessage<TResponse, WorkerMessageServiceMessage> = {
            type: WorkerMessageServiceMessage.RespondToAsyncRequest,
            payload,
            requestId
        };

        this._postMessage(message);
    };

    /**
     * Send a one-way (no response) message.
     * 
     * @typeParam TPayload - The type of the message payload.
     * 
     * @param message - The message.
     */
    send: <TPayload>(message: PayloadMessage<TPayload, TMessage>) => void
    = <TPayload>(message: PayloadMessage<TPayload, TMessage>) => {
        this._postMessage(message);
    };

    /**
     * Try to resolve a message with the service. A message will be resolved by the service if it is a response to a
     * previously made asynchronous request.
     * 
     * @param message - The message.
     * @returns Whether the message was resolved by the service.
     */
    tryResolveMessage: (message: PayloadMessage) => boolean
    = (message) => {
        switch (message.type as WorkerMessageServiceMessage) {
            case WorkerMessageServiceMessage.RespondToAsyncRequest:
                const { payload, requestId } = message as AsyncPayloadMessage<any, WorkerMessageServiceMessage>;
                requestId in this._resolvers || crash(`AsyncWorkerService.tryResolveRequest called with missing request ID (${requestId}).`);

                try {
                    this._resolvers[requestId](payload);
                } finally {
                    delete this._resolvers[requestId];
                }

                return true;

            default:
                return false;
        }
    };
}

export default WorkerMessageService;
