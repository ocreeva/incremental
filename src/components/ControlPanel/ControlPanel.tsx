import { setCurrentRoutine } from '@/features/execution';
import { selectGameIsPaused, setGameIsPaused } from '@/features/game';
import { useAppDispatch, useAppSelector } from '@/hooks';
import GameLoopService from '@/services/GameLoopService';

import * as S from './ControlPanel.styles';

const ControlPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const gameIsPaused = useAppSelector(selectGameIsPaused);

    const handlePlay: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(setGameIsPaused(!gameIsPaused));

        if (gameIsPaused) {
            GameLoopService.createRoutineAsync()
                .then(routine => dispatch(setCurrentRoutine({ routine })));
        }
    }

    return (
        <S.Container>
            <S.PlayGlow />
            <S.PlayButton onClick={handlePlay}>
                { gameIsPaused ? <S.Play /> : <S.Pause /> }
            </S.PlayButton>
        </S.Container>
    );
};

export default ControlPanel;
