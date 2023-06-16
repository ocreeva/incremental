import AsyncWorkerService, { AsyncWorkerAction } from '@/services/AsyncWorkerService';
import GameLoopAction from '@/services/GameLoopService/GameLoopAction';

import RoutineProcessor from './RoutineProcessor';

const asyncWorkerService = new AsyncWorkerService(self.postMessage);
const routineProcessor = new RoutineProcessor(asyncWorkerService);

const postAction: (action: AsyncWorkerAction | GameLoopAction, payload?: any, requestId?: string) => void
= (action, payload = undefined, requestId = undefined) => self.postMessage({ action, payload, requestId });

const respondToRequest: (requestId: string, payload: any) => void
= (requestId, payload) => postAction(AsyncWorkerAction.RespondToAsyncRequest, payload, requestId);

self.onmessage = ({ data: { action, payload = undefined, requestId = undefined } }) => {
    switch (action as AsyncWorkerAction | GameLoopAction) {
        case AsyncWorkerAction.RespondToAsyncRequest:
            asyncWorkerService.resolveRequest(requestId, payload);
            break;

        case GameLoopAction.CreateRoutineAsync:
            const { script } = payload;
            const routine = routineProcessor.createRoutine(script);
            respondToRequest(requestId, { routine });
            break;

        case GameLoopAction.Start:
            break;

        case GameLoopAction.Stop:
            break;

        case GameLoopAction.Tick:
            const { deltaTime } = payload;
            routineProcessor.update(deltaTime);
            break;

        default:
            console.warn('Unhandled action in worker:', action);
            break;
    }
}
