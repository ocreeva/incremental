import PayloadMessage from './PayloadMessage';

/**
 * Represents a provider for sending two-way (request/response) message requests.
 * 
 * @typeParam TMessage - The type used for two-way message types.
 */
declare interface MessageRequestProvider<TMessage extends string> {
    /**
     * Send a two-way message request.
     * 
     * @typeParam TPayload - The type of the request payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param message - The request message.
     * @returns The response, as a Promise.
     */
    requestAsync: <TPayload, TResponse>(message: PayloadMessage<TPayload, TMessage>) => Promise<TResponse>;
}

export default MessageRequestProvider;
