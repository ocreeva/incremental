import { crash } from '@/core';

import type { Update } from "@reduxjs/toolkit";
import type { OperationState } from "@/types";
import type { MessageSendProvider, PayloadMessage } from "@/types/worker";

enum ModelMessage {
    Start = 'Game/Start',
    Stop = 'Game/Stop',
    Tick = 'Game/Tick',
    Update = 'Game/Update',
}

const assertMessageType: <TPayload>(message: PayloadMessage<any>, type: ModelMessage) => asserts message is PayloadMessage<TPayload, ModelMessage>
= (message, type) => message.type === type || crash(`Message type (${message.type}) does not match expected type (${type}).`);

declare type SendEmptyHandler = (provider: MessageSendProvider<ModelMessage>) => void;
const createEmptyMessageHandlers: (type: ModelMessage) => [SendEmptyHandler]
= (type) => [
    (provider) => provider.send<void>({ type, payload: undefined }),
];

declare type SendHandler<TPayload> = (provider: MessageSendProvider<ModelMessage>, payload: TPayload) => void;
declare type ReceiveHandler<TPayload> = (message: PayloadMessage) => PayloadMessage<TPayload, ModelMessage>;
const createMessageHandlers: <TPayload>(type: ModelMessage) => [SendHandler<TPayload>, ReceiveHandler<TPayload>]
= <TPayload>(type: ModelMessage) => [
    (provider, payload) => provider.send({ type, payload }),
    (message) => {
        assertMessageType<TPayload>(message, type);
        return message;
    }
];

export const [ sendStartMessage ] = createEmptyMessageHandlers(ModelMessage.Start);

export const [ sendStopMessage ] = createEmptyMessageHandlers(ModelMessage.Stop);

export const [ sendTickMessage ] = createEmptyMessageHandlers(ModelMessage.Tick);

export declare type UpdatePayload = {
    operationUpdates: Update<OperationState>[];
};
export const [ sendUpdateMessage, getUpdateMessage ] = createMessageHandlers<UpdatePayload>(ModelMessage.Update);

export default ModelMessage;
