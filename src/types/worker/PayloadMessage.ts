/**
 * A message with a type and an associated payload.
 * 
 * @typeParam TPayload - The type of the message's payload.
 * @typeParam TMessage - The type used for the message type.
 */
declare type PayloadMessage<TPayload = any, TMessage extends string = string> = {
    type: TMessage;
    payload: TPayload;
};

export declare type PayloadMessageAction = (message: PayloadMessage) => void;

export default PayloadMessage;
