import { selectSubroutine } from '@/features/subroutines';
import { useAppSelector } from '@/hooks';
import { type EntityId } from '@/types';

import * as S from './Subroutine.styles';
import Operation from './Operation';

declare type SubroutineProps = {
    id: EntityId;
};

const Subroutine: React.FC<SubroutineProps> = ({ id }) => {
    const { duration, operations } = useAppSelector(state => selectSubroutine(state, id));

    const style = {
        '--subroutine_duration': `${duration}`,
    } as React.CSSProperties;

    return (
        <S.Container style={style}>
            { operations.map(operationId => <Operation key={operationId} id={operationId} />) }
        </S.Container>
    );
};

export default Subroutine;
