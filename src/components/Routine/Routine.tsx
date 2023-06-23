import { selectCurrentRoutine } from '@/features/routines';
import { useAppSelector } from '@/hooks';

import * as S from './Routine.styles';
import Subroutine from './Subroutine';

import type { CSSProperties } from 'react';

const Routine: React.FC = () => {
    const currentRoutine = useAppSelector(selectCurrentRoutine);
    if (currentRoutine === undefined) return (<></>);

    const { duration, subroutines } = currentRoutine;

    const style = {
        '--routine_duration': `${duration}`,
        '--routine_subroutine-count': `${subroutines.length}`,
    } as CSSProperties;

    return (
        <S.Container style={style}>
            <S.ScrollRegion>
                { subroutines.map(subroutineId => <Subroutine key={subroutineId} id={subroutineId} />) }
            </S.ScrollRegion>
        </S.Container>
    );
};

export default Routine;
