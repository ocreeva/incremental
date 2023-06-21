import { CSSProperties } from 'react';

import { SubroutineModel } from '@/types';

import * as S from './Subroutine.styles';
import Operation from './Operation';

const Subroutine: React.FC<SubroutineModel> = ({ operations, duration }) => {
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
