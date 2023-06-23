import { useEffect, useState } from 'react';

// import { setCurrentRoutine } from '@/features/execution';
import { selectGameIsPlaying } from '@/features/game';
import { useAppDispatch, useAppSelector } from '@/hooks';
// import GameLoopService from '@/services/GameLoopService';

import * as S from './PlayButton.styles';

const PlayButton: React.FC = () => {
    // const dispatch = useAppDispatch();
    const gameIsPlaying = useAppSelector(selectGameIsPlaying);

    const [gameIsPlayingState, setGameIsPlayingState] = useState({ hasChanged: false, initial: gameIsPlaying });
    useEffect(() => {
        if (gameIsPlayingState.hasChanged) return;
        if (gameIsPlayingState.initial === gameIsPlaying) return;

        setGameIsPlayingState({ ...gameIsPlayingState, hasChanged: true });
    }, [gameIsPlaying]);

    const [isDisabled, setIsDisabled] = useState(false);

    const handlePlay: React.MouseEventHandler<HTMLButtonElement> = () => {
        // setIsDisabled(true);
        // const animationDelayPromise = new Promise<void>(resolve => setTimeout(resolve, 100));

        // if (gameIsPlaying) {
        //     GameLoopService.stop();
        //     animationDelayPromise.then(() => setIsDisabled(false));
        // }
        // else {
        //     const startPromise = GameLoopService.createRoutineAsync()
        //         .then(({ routineState }) => {
        //             dispatch(setCurrentRoutine({ routineState }))
        //             GameLoopService.start();
        //         });
        //     Promise.all([ animationDelayPromise, startPromise ]).then(() => setIsDisabled(false));
        // }
    };

    const Icon = gameIsPlayingState.hasChanged
        ? (gameIsPlaying ? S.AnimatedStopIcon : S.AnimatedPlayIcon)
        : (gameIsPlaying ? S.StopIcon : S.PlayIcon);

    return (<>
        <S.PlayGlow />
        <S.PlayButton onClick={handlePlay} disabled={isDisabled}>
            <Icon />
        </S.PlayButton>
    </>);
};

export default PlayButton;
