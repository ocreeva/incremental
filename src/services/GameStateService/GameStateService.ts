import store from '@/App/store';
import { setGameIsPlaying } from '@/features/game';
import { selectInstruction } from '@/features/instructions';
import { addOperations } from '@/features/operations';
import { addRoutine, setCurrentRoutineId } from '@/features/routines';
import { selectCurrentScriptId, selectScript } from '@/features/scripts';
import { addSubroutines } from '@/features/subroutines';
import AsyncWorkerService from '@/services/AsyncWorkerService';
import {
    AsyncModelMessage, ModelMessage,
    createRoutineAsync,
    prepareToGetInstruction,
    prepareToGetScript,
} from '@/workers/model/client';

import type { PayloadMessage } from '@/types/worker';

const worker = new Worker(new URL('@/workers/model/modelWorker', import.meta.url), { type: 'module' });
const asyncWorkerService = new AsyncWorkerService<AsyncModelMessage>(message => worker.postMessage(message));

worker.onmessage = ({ data: message }) => {
    // give the AsyncWorkerService a chance to handle any asynchronous responses
    if (asyncWorkerService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage<any>;
    switch (type as AsyncModelMessage | ModelMessage) {
        case AsyncModelMessage.GetInstruction: {
            const [{ payload: { instructionId } }, respond] = prepareToGetInstruction(message);
            const instruction = selectInstruction(store.getState(), instructionId);
            respond(asyncWorkerService, { instruction });
            break;
        }

        case AsyncModelMessage.GetScript: {
            const [{ payload: { scriptId } }, respond] = prepareToGetScript(message);
            const script = selectScript(store.getState(), scriptId);
            respond(asyncWorkerService, { script });
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
        const { operations, subroutines, routine } = await createRoutineAsync(asyncWorkerService, { scriptId });

        store.dispatch(addOperations(operations));
        store.dispatch(addSubroutines(subroutines));
        store.dispatch(addRoutine(routine));
        store.dispatch(setCurrentRoutineId(routine.id));

        store.dispatch(setGameIsPlaying(true));
    };

    public static stopAsync: () => Promise<void>
    = async () => {
        store.dispatch(setGameIsPlaying(false));
    };
}

export default GameStateService;
