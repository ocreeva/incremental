import PayloadMessage from './PayloadMessage';

/**
 * Represents a provider for sending a one-way (no response) message.
 * 
 * @typeParam TMessage - The type used for one-way message types.
 */
declare interface MessageRespondProvider<TMessage extends string> {
    /**
     * Send a one-way message.
     * 
     * @typeParam TPayload - The type of the message payload.
     * 
     * @param message - The message.
     */
    send: <TPayload>(message: PayloadMessage<TPayload, TMessage>) => void;
}

export default MessageRespondProvider;
