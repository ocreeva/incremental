import { useEffect, useState } from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';

import { selectGameIsPlaying } from '@/features/game';
import { useAppSelector } from '@/hooks';
import GameStateService from '@/services/GameStateService';

import * as S from './PlayButton.styles';

const PlayButton: React.FC = () => {
    const gameIsPlaying = useAppSelector(selectGameIsPlaying);
    const [gameIsPlayingInitial] = useState(gameIsPlaying);
    const [gameIsPlayingHasChanged, setGameIsPlayingHasChanged] = useState(false);

    useEffect(() => {
        if (gameIsPlaying === gameIsPlayingInitial) return;
        setGameIsPlayingHasChanged(true);
    }, [gameIsPlaying, gameIsPlayingInitial]);

    const [isDisabled, setIsDisabled] = useState(false);

    const handlePlay: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsDisabled(true);
        (gameIsPlaying ? GameStateService.stopAsync() : GameStateService.startAsync())
            .then(() => setIsDisabled(false));
    };

    const Icon = gameIsPlayingHasChanged
        ? (gameIsPlaying ? S.AnimatedStopIcon : S.AnimatedPlayIcon)
        : (gameIsPlaying ? S.StopIcon : S.PlayIcon);

    return (<>
        <S.PlayGlow />
        <S.PlayButton type='button' onClick={handlePlay} disabled={isDisabled}>
            <Icon />
            <VisuallyHidden>Play</VisuallyHidden>
        </S.PlayButton>
    </>);
};

export default PlayButton;
