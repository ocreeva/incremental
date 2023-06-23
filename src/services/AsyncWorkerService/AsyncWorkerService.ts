import { crash } from '@/core';

import AsyncWorkerMessageType from './AsyncWorkerMessageType';

import type { Action } from '@/types';
import type { AsyncRequestProvider, PayloadMessage } from '@/types/worker';
import type AsyncPayloadMessage from './AsyncPayloadMessage';

/**
 * Provides a service for asynchronous requests across the main/worker thread boundary.
 */
class AsyncWorkerService implements AsyncRequestProvider {
    private readonly _postMessage: Action<any>;
    private readonly _resolvers: { [requestId: string]: (payload: any) => void } = {};

    constructor(postMessage: Action<any>) {
        this._postMessage = postMessage;
    }

    /**
     * Make an asynchronous request across the main/worker thread boundary.
     * 
     * @typeParam TResponse - The type of the response.
     * @typeParam TPayload - The type of the request's payload.
     * 
     * @param type - The request's message type.
     * @param payload - The request's payload.
     * @returns The asynchronous response, as a Promise.
     */
    requestAsync: <TResponse = void, TPayload = void>(type: string, payload: TPayload) => Promise<TResponse>
    = <TResponse, TPayload>(type: string, payload: TPayload) => {
        const requestId = crypto.randomUUID();
        const message: AsyncPayloadMessage<TPayload> = { type, payload, requestId };
        const promise = new Promise<TResponse>(resolve => this._resolvers[requestId] = resolve);

        this._postMessage(message);

        return promise;
    }

    /**
     * Respond to an asynchronous request.
     * 
     * @typeParam TRequestPayload - The type of the request payload.
     * @typeParam TResponsePayload - The type of the response payload.
     * 
     * @param requestMessage - The request message.
     * @param payload - The response payload.
     */
    respond: <TRequestPayload, TResponsePayload>(requestMessage: PayloadMessage<TRequestPayload>, payload: TResponsePayload) => void
    = <TRequestPayload, TResponsePayload>(requestMessage: PayloadMessage<TRequestPayload>, payload: TResponsePayload) => {
        const { requestId } = requestMessage as AsyncPayloadMessage<TRequestPayload>;
        const message: AsyncPayloadMessage<TResponsePayload> = { type: AsyncWorkerMessageType.Respond, payload, requestId };

        this._postMessage(message);
    }

    /**
     * Try to resolve a message with the service. A message will be resolved by the service if it is a response to a
     * previously made asynchronous request.
     * 
     * @param message - The message.
     * @returns Whether the message was resolved by the service.
     */
    tryResolveMessage: (message: PayloadMessage<any>) => boolean
    = (message) => {
        switch (message.type as AsyncWorkerMessageType) {
            case AsyncWorkerMessageType.Respond:
                const { payload, requestId } = message as AsyncPayloadMessage<any>;
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
