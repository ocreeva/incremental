/**
 * A message with a string type and an associated payload.
 * 
 * @typeParam TPayload - The type of the message's payload.
 */
declare type PayloadMessage<TPayload = void> = {
    type: string;
    payload: TPayload;
};

export default PayloadMessage;
