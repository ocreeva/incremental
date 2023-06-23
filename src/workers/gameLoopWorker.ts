import { crash } from '@/core';
import AsyncWorkerService from '@/services/AsyncWorkerService';
import GameLoopMessageType from '@/services/GameLoopService/GameLoopMessageType';

// import RoutineProcessor from './RoutineProcessor';

import type { PayloadMessage } from '@/types/worker';

const asyncWorkerService = new AsyncWorkerService(self.postMessage);
// const routineProcessor = new RoutineProcessor(asyncWorkerService);

// const postAction: (action: GameLoopMessageType, payload?: any) => void
// = (action, payload = undefined) => self.postMessage({ action, payload });

self.onmessage = ({ data: message }) => {
    // give the AsyncWorkerService a chance to handle any asynchronous responses
    if (asyncWorkerService.tryResolveMessage(message)) return;

    const { type } = message as PayloadMessage;
    switch (type as GameLoopMessageType) {
        // case GameLoopMessageType.CreateRoutineAsync:
        //     const { script } = payload;
        //     const routineState = routineProcessor.createRoutine(script);
        //     respondToRequest(requestId, { routineState });
        //     break;

        // case GameLoopMessageType.Start:
        //     break;

        // case GameLoopMessageType.Stop:
        //     break;

        // case GameLoopMessageType.Tick:
        //     const { deltaTime } = payload;
        //     const routineStateUpdate = routineProcessor.update(deltaTime);
        //     if (routineStateUpdate !== undefined) {
        //         postAction(GameLoopMessageType.UpdateState, { routineStateUpdate });
        //     }

        //     break;

        default:
            crash(`gameLoopWorker.onmessage received message with unhandled type (${type}).`);
    }
}
