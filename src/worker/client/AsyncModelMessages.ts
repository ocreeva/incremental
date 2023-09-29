import { type CommandId } from '@/constants';
import { AsyncModelMessage } from '@/constants/worker';
import { crash } from '@/core';
import type { CommandData, CommandState, EntityId, InstructionState, OperationState, RoutineState, ScriptState, SubroutineState } from '@/types';
import type { MessageRequestProvider, MessageRespondProvider, PayloadMessage } from '@/types/worker';

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
    routine: RoutineState;
    subroutines: SubroutineState[];
    operations: OperationState[];
};
export const [ createRoutineAsync, prepareToCreateRoutine ] = createMessageHandlers<CreateRoutineRequest, CreateRoutineResponse>(AsyncModelMessage.CreateRoutine);

export declare type GetCommandRequest = {
    commandId: CommandId;
};
export declare type GetCommandResponse = {
    command: CommandState;
};
export const [ getCommandAsync, prepareToGetCommand ] = createMessageHandlers<GetCommandRequest, GetCommandResponse>(AsyncModelMessage.GetCommand);

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
    instruction: InstructionState;
};
export const [ getInstructionAsync, prepareToGetInstruction ] = createMessageHandlers<GetInstructionRequest, GetInstructionResponse>(AsyncModelMessage.GetInstruction);

export declare type GetScriptRequest = {
    scriptId: EntityId;
};
export declare type GetScriptResponse = {
    script: ScriptState;
};
export const [ getScriptAsync, prepareToGetScript ] = createMessageHandlers<GetScriptRequest, GetScriptResponse>(AsyncModelMessage.GetScript);
