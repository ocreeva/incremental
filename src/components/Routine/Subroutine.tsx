import * as S from './Subroutine.styles';
import Operation from './Operation';

import type { CSSProperties } from 'react';
import type { SubroutineState } from '@/types';

const Subroutine: React.FC<SubroutineState> = ({ operations, duration }) => {
    const style = {
        '--subroutine_duration': `${duration}`,
    } as CSSProperties;

    return (
        <S.Container style={style}>
            { operations.map(operation => <Operation {...operation} />) }
        </S.Container>
    );
};

export default Subroutine;
