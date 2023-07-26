import { useEffect, useRef } from 'react';

import { selectCurrentRoutine } from '@/features/routines';
import { useAppSelector } from '@/hooks';

import * as S from './Routine.styles';
import Subroutine from './Subroutine';

const Routine: React.FC = () => {
    const currentRoutine = useAppSelector(selectCurrentRoutine);
    const scrollContainer = useRef<HTMLDivElement>(null);

    const { duration, elapsed, subroutines } = currentRoutine;
    const scrollTarget = Math.max(0, Math.min(duration - 42, Math.round(elapsed - 21)));
    useEffect(() => {
        if (scrollContainer.current === null) return;

        scrollContainer.current.scrollTo(scrollTarget, 0);
    }, [scrollTarget]);

    const style = {
        '--routine_duration': `${duration}`,
    } as React.CSSProperties;

    return (
        <S.Container ref={scrollContainer} style={style}>
            <S.ScrollRegion>
                { subroutines.map(subroutineId => <Subroutine key={subroutineId} id={subroutineId} />) }
            </S.ScrollRegion>
        </S.Container>
    );
};

export default Routine;
