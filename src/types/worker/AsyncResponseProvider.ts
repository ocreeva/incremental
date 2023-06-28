import PayloadMessage from './PayloadMessage';

/**
 * Represents a provider for asynchronous requests across the main/worker thread boundary.
 * 
 * @typeParam TMessage - The type used for request messages types.
 */
declare interface AsyncResponseProvider<TMessage extends string> {
    /**
     * Respond to an asynchronous request.
     * 
     * @typeParam TPayload - The type of the request's payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param requestMessage - The request message.
     * @param payload - The response payload.
     */
    respond: <TPayload, TResponse>(requestMessage: PayloadMessage<TPayload, TMessage>, payload: TResponse) => void;
};

export default AsyncResponseProvider;
