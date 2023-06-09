import { selectGameIsPaused, setGameIsPaused } from '@/features/game';
import { useAppDispatch, useAppSelector } from '@/hooks';

import * as S from './ControlPanel.styles';

const ControlPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const gameIsPaused = useAppSelector(selectGameIsPaused);

    const handlePlay: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(setGameIsPaused(!gameIsPaused));
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
