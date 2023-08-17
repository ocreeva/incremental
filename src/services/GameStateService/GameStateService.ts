import store from '@/App/store';
import { selectAllCommands, updateCommands } from '@/features/commands';
import { setGameIsPlaying } from '@/features/game';
import { selectInstruction } from '@/features/instructions';
import { addOperations, updateOperations } from '@/features/operations';
import { addRoutine, removeRoutine, selectCurrentRoutineId, setCurrentRoutineId, updateCurrentRoutine } from '@/features/routines';
import { selectCurrentScriptId, selectScript } from '@/features/scripts';
import { addSubroutines, updateSubroutines } from '@/features/subroutines';
import WorkerMessageService from '@/services/WorkerMessageService';
import {
    AsyncModelMessage, ModelMessage,
    createRoutineAsync,
    getUpdateMessage,
    prepareToGetAllCommands,
    prepareToGetInstruction,
    prepareToGetScript,
    sendStartMessage,
    sendStopMessage,
    sendTickMessage,
} from '@/worker/client';
import { type PayloadMessage, type PayloadMessageAction } from '@/types/worker';

const worker = new Worker(new URL('@/worker/GameModelWorker', import.meta.url), { type: 'module' });

const postMessageAction: PayloadMessageAction = (message) => worker.postMessage(message);
const messageService = new WorkerMessageService<ModelMessage, AsyncModelMessage>(postMessageAction);

abstract class GameStateService {
    public static startAsync: () => Promise<void>
    = async () => {
        const state = store.getState();
        const previousRoutineId = selectCurrentRoutineId(state);
        const scriptId = selectCurrentScriptId(state);
        const { operations, subroutines, routine } = await createRoutineAsync(messageService, { scriptId });

        store.dispatch(addOperations(operations));
        store.dispatch(addSubroutines(subroutines));
        store.dispatch(addRoutine(routine));
        store.dispatch(setCurrentRoutineId(routine.id));
        store.dispatch(removeRoutine(previousRoutineId));

        sendStartMessage(messageService);
        store.dispatch(setGameIsPlaying(true));
    };

    public static stopAsync: () => Promise<void>
    = async () => {
        sendStopMessage(messageService);
        store.dispatch(setGameIsPlaying(false));
    };

    public static tick: () => void
    = () => {
        sendTickMessage(messageService);
    };
}

worker.onmessage = ({ data: message }) => {
    // give the WorkerMessageService a chance to handle any two-way message responses
    if (messageService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage;
    switch (type as AsyncModelMessage | ModelMessage) {
        case AsyncModelMessage.GetAllCommands: {
            const [_, respond] = prepareToGetAllCommands(message);
            const commands = selectAllCommands(store.getState());
            respond(messageService, { commands });
            break;
        }

        case AsyncModelMessage.GetInstruction: {
            const [{ payload: { instructionId } }, respond] = prepareToGetInstruction(message);
            const instruction = selectInstruction(store.getState(), instructionId);
            respond(messageService, { instruction });
            break;
        }

        case AsyncModelMessage.GetScript: {
            const [{ payload: { scriptId } }, respond] = prepareToGetScript(message);
            const script = selectScript(store.getState(), scriptId);
            respond(messageService, { script });
            break;
        }

        case ModelMessage.Update: {
            const { payload: {
                commandUpdates,
                operationCreates,
                operationUpdates,
                routineIsComplete,
                routineUpdate,
                subroutineUpdates,
            } } = getUpdateMessage(message);

            if (commandUpdates.length > 0) store.dispatch(updateCommands(commandUpdates));

            if (operationCreates.length > 0) store.dispatch(addOperations(operationCreates));
            if (operationUpdates.length > 0) store.dispatch(updateOperations(operationUpdates));

            if (subroutineUpdates.length > 0) store.dispatch(updateSubroutines(subroutineUpdates));

            if (routineUpdate !== undefined) store.dispatch(updateCurrentRoutine(routineUpdate));

            if (routineIsComplete) GameStateService.stopAsync();

            break;
        }
    
        default:
            console.warn('Unhandled action in worker processing:', type);
            break;
    }
};

export default GameStateService;
