import { crash } from '@/core';

import type { Update } from "@reduxjs/toolkit";
import type { OperationState } from "@/types";
import type { PayloadMessage, PayloadMessageAction } from "@/types/worker";

enum ModelMessage {
    Start = 'Game/Start',
    Stop = 'Game/Stop',
    Tick = 'Game/Tick',
    Update = 'Game/Update',
}

const assertMessageType: <TPayload>(message: PayloadMessage<any>, type: ModelMessage) => asserts message is PayloadMessage<TPayload, ModelMessage>
= (message, type) => message.type === type || crash(`Message type (${message.type}) does not match expected type (${type}).`);

declare type SendEmptyMessageHandler = (sendMessage: PayloadMessageAction) => void;
const createEmptyMessageHandlers: (type: ModelMessage) => [SendEmptyMessageHandler]
= (type) => [
    (sendMessage) => sendMessage({ type, payload: undefined }),
];

declare type SendMessageHandler<TPayload> = (sendMessage: PayloadMessageAction, payload: TPayload) => void;
declare type GetMessagePayloadHandler<TPayload> = (message: PayloadMessage) => TPayload;
const createMessageHandlers: <TPayload>(type: ModelMessage) => [SendMessageHandler<TPayload>, GetMessagePayloadHandler<TPayload>]
= <TPayload>(type: ModelMessage) => [
    (sendMessage, payload) => sendMessage({ type, payload }),
    (message) => {
        assertMessageType<TPayload>(message, type);
        return message.payload;
    },
];

export const [ sendStartMessage ] = createEmptyMessageHandlers(ModelMessage.Start);

export const [ sendStopMessage ] = createEmptyMessageHandlers(ModelMessage.Stop);

export const [ sendTickMessage ] = createEmptyMessageHandlers(ModelMessage.Tick);

export declare type UpdatePayload = {
    operationUpdates: Update<OperationState>[];
};
export const [ sendUpdateMessage, getUpdateMessagePayload ] = createMessageHandlers<UpdatePayload>(ModelMessage.Update);

export default ModelMessage;
