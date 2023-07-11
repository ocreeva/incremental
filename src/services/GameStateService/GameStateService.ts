import store from '@/App/store';
import { setGameIsPlaying } from '@/features/game';
import { selectInstruction } from '@/features/instructions';
import { addOperations, updateOperations } from '@/features/operations';
import { addRoutine, setCurrentRoutineId } from '@/features/routines';
import { selectCurrentScriptId, selectScript } from '@/features/scripts';
import { addSubroutines } from '@/features/subroutines';
import WorkerMessageService from '@/services/WorkerMessageService';
import {
    AsyncModelMessage, ModelMessage,
    createRoutineAsync,
    getUpdateMessage,
    prepareToGetInstruction,
    prepareToGetScript,
    sendStartMessage,
    sendStopMessage,
    sendTickMessage,
} from '@model';

import type { PayloadMessage, PayloadMessageAction } from '@/types/worker';

const worker = new Worker('/model/worker', { type: 'module' });

const postMessageAction: PayloadMessageAction = (message) => worker.postMessage(message);
const messageService = new WorkerMessageService<ModelMessage, AsyncModelMessage>(postMessageAction);

worker.onmessage = ({ data: message }) => {
    // give the WorkerMessageService a chance to handle any two-way message responses
    if (messageService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage;
    switch (type as AsyncModelMessage | ModelMessage) {
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
            const { payload: { operationUpdates } } = getUpdateMessage(message);
            store.dispatch(updateOperations(operationUpdates));
            break;
        }
    
        default:
            console.warn('Unhandled action in worker processing:', type);
            break;
    }
};

abstract class GameStateService {
    public static startAsync: () => Promise<void>
    = async () => {
        const scriptId = selectCurrentScriptId(store.getState());
        const { operations, subroutines, routine } = await createRoutineAsync(messageService, { scriptId });

        store.dispatch(addOperations(operations));
        store.dispatch(addSubroutines(subroutines));
        store.dispatch(addRoutine(routine));
        store.dispatch(setCurrentRoutineId(routine.id));

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

export default GameStateService;
