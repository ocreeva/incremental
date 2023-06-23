import store from '@/App/store';
import { setGameIsPlaying } from '@/features/game';
import AsyncWorkerService from '@/services/AsyncWorkerService';

import GameLoopMessageType from './GameLoopMessageType';

import type { RoutineState } from '@/types';
import type { PayloadMessage } from '@/types/worker';

const worker = new Worker(new URL('@/workers/gameLoopWorker', import.meta.url), { type: 'module' });
const asyncWorkerService = new AsyncWorkerService(message => worker.postMessage(message));

const postAction: (action: GameLoopMessageType, payload?: any) => void
= (action, payload = undefined, requestId = undefined) => worker.postMessage({ action, payload, requestId });

worker.onmessage = ({ data: message }) => {
    // give the AsyncWorkerService a chance to handle any asynchronous responses
    if (asyncWorkerService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage;
    switch (type as GameLoopMessageType) {
        // case GameLoopAction.GetScript:
        //     const { program: { currentScript } } = store.getState();
        //     respondToRequest(requestId, currentScript);
        //     break;

        // case GameLoopAction.UpdateState:
        //     const { routineStateUpdate } = payload;
        //     store.dispatch(updateRoutineState({ routineStateUpdate }));
        //     break;

        default:
            console.warn('Unhandled action in worker processing:', type);
    }
}

abstract class GameLoopService {
    public static createRoutineAsync: () => Promise<{ routineState: RoutineState }>
    = async () => {
        const { program: { currentScript } } = store.getState();
        return await asyncWorkerService.requestAsync(GameLoopMessageType.CreateRoutineAsync, { script: currentScript });
    }

    public static start: () => void
    = () => {
        store.dispatch(setGameIsPlaying(true));
        postAction(GameLoopMessageType.Start);
    }

    public static stop: () => void
    = () => {
        store.dispatch(setGameIsPlaying(false));
        postAction(GameLoopMessageType.Stop);
    }

    public static tick: (deltaTime: number) => void
    = (deltaTime) => postAction(GameLoopMessageType.Tick, { deltaTime });
}

export default GameLoopService;
