import store from '@/App/store';
import { AsyncModelMessage, ModelMessage } from '@/constants/worker';
import { selectCommandData, upsertCommandData } from '@/features/commandData';
import { updateCommandView } from '@/features/commandView';
import { setGameIsPlaying } from '@/features/game';
import { selectInstruction } from '@/features/instructionData';
import { addOperations, updateOperations } from '@/features/operationView';
import { addRoutine, removeRoutine, selectCurrentRoutineId, setCurrentRoutineId, updateCurrentRoutine } from '@/features/routineView';
import { selectCurrentScriptId, selectScript } from '@/features/scriptData';
import { addSubroutines, updateSubroutines } from '@/features/subroutineView';
import WorkerMessageService from '@/services/WorkerMessageService';
import type { PayloadMessage, PayloadMessageAction } from '@/types/worker';
import {
    createRoutineAsync,
    getUpdateMessage,
    prepareToGetCommandData,
    prepareToGetInstruction,
    prepareToGetScript,
    sendResetMessage,
    sendStartMessage,
    sendStopMessage,
    sendTickMessage,
} from '@/worker/client';

const worker = new Worker(new URL('@/worker/GameModelWorker', import.meta.url), { type: 'module' });

const postMessageAction: PayloadMessageAction = (message) => worker.postMessage(message);
const messageService = new WorkerMessageService<ModelMessage, AsyncModelMessage>(postMessageAction);

abstract class GameStateService {
    public static resetAsync: () => Promise<void>
    = async () => {
        sendResetMessage(messageService);
    };

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
        case AsyncModelMessage.GetCommandData: {
            const [{ payload: { commandId }}, respond] = prepareToGetCommandData(message);
            const commandData = selectCommandData(store.getState(), commandId);
            respond(messageService, { commandData });
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
                commandData,
                commandView,
                operations,
                operationUpdates,
                routineIsComplete,
                routineUpdate,
                subroutines,
                subroutineUpdates,
            } } = getUpdateMessage(message);

            if (commandData.length > 0) store.dispatch(upsertCommandData(commandData));
            if (commandView.length > 0) store.dispatch(updateCommandView(commandView));

            if (operations.length > 0) store.dispatch(addOperations(operations));
            if (operationUpdates.length > 0) store.dispatch(updateOperations(operationUpdates));

            if (subroutines.length > 0) store.dispatch(addSubroutines(subroutines));
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
