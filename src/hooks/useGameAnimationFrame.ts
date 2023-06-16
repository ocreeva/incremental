import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectGameIsPaused } from '@/features/game';

export interface GameAnimationFrameCallback {
    (deltaTime: number): void;
}

const useGameAnimationFrame: (callback: GameAnimationFrameCallback) => void
= (callback) => {
    const previousTime = useRef<number>();
    const requestId = useRef<number>();
    const gameIsPaused = useSelector(selectGameIsPaused);

    const animate: (time: DOMHighResTimeStamp) => void
    = (time) => {
        try {
            if (previousTime.current !== undefined)
            {
                const deltaTime = time - previousTime.current;
                callback(deltaTime);
            }
        }
        finally {
            previousTime.current = time;
            requestId.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (gameIsPaused) return;

        previousTime.current = undefined;

        requestId.current = requestAnimationFrame(animate);
        return () => {
            if (requestId.current === undefined) return;

            cancelAnimationFrame(requestId.current);
            requestId.current = undefined;
        }
    }, [gameIsPaused]);
};

export default useGameAnimationFrame;
