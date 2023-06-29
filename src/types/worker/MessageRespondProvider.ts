import PayloadMessage from './PayloadMessage';

/**
 * Represents a provider for responding to a two-way (request/response) message.
 * 
 * @typeParam TMessage - The type used for two-way message types.
 */
declare interface MessageRespondProvider<TMessage extends string> {
    /**
     * Respond to a two-way message.
     * 
     * @typeParam TPayload - The type of the request payload.
     * @typeParam TResponse - The type of the response payload.
     * 
     * @param requestMessage - The request message.
     * @param payload - The response payload.
     */
    respond: <TPayload, TResponse>(requestMessage: PayloadMessage<TPayload, TMessage>, payload: TResponse) => void;
};

export default MessageRespondProvider;
