import { EntityId } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { AsyncModelMessage } from '@/constants/worker';
import { crash } from '@/core';
import { CommandData, InstructionData, OperationView, RoutineView, ScriptData, SubroutineView } from '@/types';
import { MessageRequestProvider, MessageRespondProvider, PayloadMessage } from '@/types/worker';

const assertMessageType: <TPayload>(message: PayloadMessage, type: AsyncModelMessage) => asserts message is PayloadMessage<TPayload, AsyncModelMessage>
= (message, type) => message.type === type || crash(`Message type (${message.type}) does not match expected type (${type}).`);

declare type RequestHandler<TRequest, TResponse> = (provider: MessageRequestProvider<AsyncModelMessage>, payload: TRequest) => Promise<TResponse>;
declare type RespondMethod<TResponse> = (provider: MessageRespondProvider<AsyncModelMessage>, response: TResponse) => void;
declare type RespondHandler<TRequest, TResponse> = (message: PayloadMessage) => [PayloadMessage<TRequest, AsyncModelMessage>, RespondMethod<TResponse>];
const createMessageHandlers: <TRequest, TResponse>(type: AsyncModelMessage) => [RequestHandler<TRequest, TResponse>, RespondHandler<TRequest, TResponse>]
= <TRequest, TResponse>(type: AsyncModelMessage) => [
    (provider, payload: TRequest) => provider.requestAsync<TRequest, TResponse>({ type, payload }),
    (message: PayloadMessage) => {
        assertMessageType<TRequest>(message, type);
        return [ message, (provider, response: TResponse) => provider.respond<TRequest, TResponse>(message, response) ];
    }
];

export declare type CreateRoutineRequest = {
    scriptId: EntityId;
};
export declare type CreateRoutineResponse = {
    routine: RoutineView;
    subroutines: SubroutineView[];
    operations: OperationView[];
};
export const [ createRoutineAsync, prepareToCreateRoutine ] = createMessageHandlers<CreateRoutineRequest, CreateRoutineResponse>(AsyncModelMessage.CreateRoutine);

export declare type GetCommandDataRequest = {
    commandId: CommandId;
};
export declare type GetCommandDataResponse = {
    commandData: CommandData;
};
export const [ getCommandDataAsync, prepareToGetCommandData ] = createMessageHandlers<GetCommandDataRequest, GetCommandDataResponse>(AsyncModelMessage.GetCommandData);

export declare type GetInstructionRequest = {
    instructionId: EntityId;
};
export declare type GetInstructionResponse = {
    instruction: InstructionData;
};
export const [ getInstructionAsync, prepareToGetInstruction ] = createMessageHandlers<GetInstructionRequest, GetInstructionResponse>(AsyncModelMessage.GetInstruction);

export declare type GetScriptRequest = {
    scriptId: EntityId;
};
export declare type GetScriptResponse = {
    script: ScriptData;
};
export const [ getScriptAsync, prepareToGetScript ] = createMessageHandlers<GetScriptRequest, GetScriptResponse>(AsyncModelMessage.GetScript);
