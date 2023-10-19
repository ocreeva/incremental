import { Update } from '@reduxjs/toolkit';

import { ModelMessage } from '@/constants/worker';
import { crash } from '@/core';
import type { CommandData, CommandView, OperationView, RoutineView, SubroutineView } from '@/types';
import type { MessageSendProvider, PayloadMessage } from '@/types/worker';

const assertMessageType: <TPayload>(message: PayloadMessage, type: ModelMessage) => asserts message is PayloadMessage<TPayload, ModelMessage>
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

export const [ sendResetMessage ] = createEmptyMessageHandlers(ModelMessage.Reset);

export const [ sendStartMessage ] = createEmptyMessageHandlers(ModelMessage.Start);

export const [ sendStopMessage ] = createEmptyMessageHandlers(ModelMessage.Stop);

export const [ sendTickMessage ] = createEmptyMessageHandlers(ModelMessage.Tick);

export declare type UpdatePayload = {
    commandData: CommandData[];
    commandView: Update<CommandView>[];

    operations: OperationView[];
    operationUpdates: Update<OperationView>[];

    routineIsComplete: boolean;
    routineUpdate?: Partial<RoutineView>;

    subroutines: SubroutineView[];
    subroutineUpdates: Update<SubroutineView>[];
};
export const [ sendUpdateMessage, getUpdateMessage ] = createMessageHandlers<UpdatePayload>(ModelMessage.Update);
