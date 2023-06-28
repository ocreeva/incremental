import PayloadMessage from './PayloadMessage';

/**
 * Represents a provider for asynchronous requests across the main/worker thread boundary.
 * 
 * @typeParam TMessage - The type used for request messages types.
 */
declare interface AsyncRequestProvider<TMessage extends string> {
    /**
     * Make an asynchronous request across the main/worker thread boundary.
     * 
     * @typeParam TPayload - The type of the request's payload.
     * @typeParam TResponse - The type of the response.
     * 
     * @param message - The request message.
     * @returns The asynchronous response, as a Promise.
     */
    requestAsync: <TPayload = void, TResponse = void>(message: PayloadMessage<TPayload, TMessage>) => Promise<TResponse>;
};

export default AsyncRequestProvider;
