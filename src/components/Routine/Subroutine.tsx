import { selectSubroutine } from '@/features/subroutines';
import { useAppSelector } from '@/hooks';

import * as S from './Subroutine.styles';
import Operation from './Operation';

import type { CSSProperties } from 'react';
import type { EntityId } from '@reduxjs/toolkit';

type SubroutineProps = {
    id: EntityId;
}

const Subroutine: React.FC<SubroutineProps> = ({ id }) => {
    const { duration, operations } = useAppSelector(state => selectSubroutine(state, id));

    const style = {
        '--subroutine_duration': `${duration}`,
    } as CSSProperties;

    return (
        <S.Container style={style}>
            { operations.map(operationId => <Operation key={operationId} id={operationId} />) }
        </S.Container>
    );
};

export default Subroutine;
