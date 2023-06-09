import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectGameIsPaused } from '@/features/game';

export interface GameAnimationFrameCallback {
    (): void;
}

const useGameAnimationFrame = (callback: GameAnimationFrameCallback): void => {
    const requestId = useRef(0);
    const gameIsPaused = useSelector(selectGameIsPaused);

    const animate = (): void => {
        try {
            callback();
        }
        finally {
            requestId.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (gameIsPaused) return;

        requestId.current = requestAnimationFrame(animate);
        return () => { cancelAnimationFrame(requestId.current); }
    }, [gameIsPaused]);
};

export default useGameAnimationFrame;
