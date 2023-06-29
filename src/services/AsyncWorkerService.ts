import { crash } from '@/core';

import type { Action } from '@/types';
import type { AsyncRequestProvider, AsyncResponseProvider, PayloadMessage, PayloadMessageAction } from '@/types/worker';

/**
 * Enumerates the asynchronous message types.
 */
enum AsyncWorkerServiceMessage {
    /**
     * Respond to an asynchronous request.
     */
    Respond = 'AsyncWorkerService/Respond',
}

declare type AsyncPayloadMessage<TPayload, TMessage extends string> = PayloadMessage<TPayload, TMessage> & {
    requestId: string;
};

/**
 * Provides a service for asynchronous requests across the main/worker thread boundary.
 * 
 * @typeParam TMessage - The type used for request messages types.
 */
class AsyncWorkerService<TMessage extends string> implements AsyncRequestProvider<TMessage>, AsyncResponseProvider<TMessage> {
    private readonly _postMessage: PayloadMessageAction;
    private readonly _resolvers: { [requestId: string]: Action<any> } = {};

    constructor(postMessage: PayloadMessageAction) {
        this._postMessage = postMessage;
    }

    /**
     * Make an asynchronous request across the main/worker thread boundary.
     * 
     * @typeParam TRequest - The type of the request payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param type - The request's message type.
     * @param payload - The request's payload.
     * @returns The asynchronous response, as a Promise.
     */
    requestAsync: <TRequest, TResponse>(message: PayloadMessage<TRequest, TMessage>) => Promise<TResponse>
    = <TPayload, TResponse>(message: PayloadMessage<TPayload, TMessage>) => {
        const requestId = crypto.randomUUID();
        const asyncMessage: AsyncPayloadMessage<TPayload, TMessage> = { ...message, requestId };
        const promise = new Promise<TResponse>(resolve => this._resolvers[requestId] = resolve);

        this._postMessage(asyncMessage);

        return promise;
    }

    /**
     * Respond to an asynchronous request.
     * 
     * @typeParam TRequest - The type of the request payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param requestMessage - The request message.
     * @param payload - The response payload.
     */
    respond: <TRequest, TResponse>(requestMessage: PayloadMessage<TRequest, TMessage>, payload: TResponse) => void
    = <TPayload, TResponse>(requestMessage: PayloadMessage<TPayload, TMessage>, payload: TResponse) => {
        const { requestId } = requestMessage as AsyncPayloadMessage<TPayload, TMessage>;
        const message: AsyncPayloadMessage<TResponse, AsyncWorkerServiceMessage> = { type: AsyncWorkerServiceMessage.Respond, payload, requestId };

        this._postMessage(message);
    }

    /**
     * Try to resolve a message with the service. A message will be resolved by the service if it is a response to a
     * previously made asynchronous request.
     * 
     * @param message - The message.
     * @returns Whether the message was resolved by the service.
     */
    tryResolveMessage: (message: PayloadMessage) => boolean
    = (message) => {
        switch (message.type as AsyncWorkerServiceMessage) {
            case AsyncWorkerServiceMessage.Respond:
                const { payload, requestId } = message as AsyncPayloadMessage<any, AsyncWorkerServiceMessage>;
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
    }
}

export default AsyncWorkerService;
