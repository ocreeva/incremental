import { useEffect } from 'react';

import WorkerAction from '@/worker/WorkerAction';

import useGameAnimationFrame from './useGameAnimationFrame';

const worker = new Worker(new URL('@/worker/gameLoopWorker', import.meta.url), { type: 'module' });

const useGameLoopWorker = () => {
    useEffect(() => {
        worker.onmessage = ({ data: { action, payload } }) => {
            switch (action) {
                default:
                    console.warn('Unhandled action in worker processing:', action);
            }
        }
    }, []);

    useGameAnimationFrame(() => {
        worker.postMessage({ action: WorkerAction.Tick });
    });
};

export default useGameLoopWorker;
