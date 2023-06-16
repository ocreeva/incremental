import store from '@/App/store';
import { setCurrentRoutine } from '@/features/execution';
import AsyncWorkerService, { AsyncWorkerAction } from '@/services/AsyncWorkerService';
import { Routine } from '@/types';

import GameLoopAction from './GameLoopAction';
import { setGameIsPlaying } from '@/features/game';

const worker = new Worker(new URL('@/workers/gameLoopWorker', import.meta.url), { type: 'module' });
const asyncWorkerService = new AsyncWorkerService(message => worker.postMessage(message));

const postAction: (action: GameLoopAction | AsyncWorkerAction, payload?: any, requestId?: string) => void
= (action, payload = undefined, requestId = undefined) => worker.postMessage({ action, payload, requestId });

const respondToRequest: (requestId: string, payload: any) => void
= (requestId, payload) => postAction(AsyncWorkerAction.RespondToAsyncRequest, payload, requestId);

worker.onmessage = ({ data: { action, payload, requestId } }) => {
    switch (action as AsyncWorkerAction | GameLoopAction) {
        case AsyncWorkerAction.RespondToAsyncRequest:
            asyncWorkerService.resolveRequest(requestId, payload);
            break;

        case GameLoopAction.GetScript:
            const { program: { currentScript } } = store.getState();
            respondToRequest(requestId, currentScript);
            break;

        default:
            console.warn('Unhandled action in worker processing:', action);
    }
}

abstract class GameLoopService {
    public static createRoutineAsync: () => Promise<Routine>
    = async () => {
        const { program: { currentScript } } = store.getState();
        return await asyncWorkerService.requestAsync(GameLoopAction.CreateRoutineAsync, { script: currentScript });
    }

    public static start: () => void
    = () => {
        store.dispatch(setGameIsPlaying(true));
        postAction(GameLoopAction.Start);
    }

    public static stop: () => void
    = () => {
        store.dispatch(setGameIsPlaying(false));
        postAction(GameLoopAction.Stop);
    }

    public static tick: (deltaTime: number) => void
    = (deltaTime) => postAction(GameLoopAction.Tick, { deltaTime });
}

export default GameLoopService;
