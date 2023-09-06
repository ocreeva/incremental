import { selectSubroutine } from '@/features/subroutines';
import { useGlyph, useParamSelector } from '@/hooks';
import { type EntityId } from '@/types';

import * as S from './Subroutine.styles';
import Operation from './Operation';

declare type SubroutineProps = {
    id: EntityId;
};

const Subroutine: React.FC<SubroutineProps> = ({ id }) => {
    const { duration, operations, role } = useParamSelector(selectSubroutine, id);

    const { GlyphComponent: RoleGlyph } = useGlyph(role);

    if (duration === 0) return null;

    const style = {
        '--subroutine_duration': `${duration}`,
    } as React.CSSProperties;

    return (
        <>
            <S.Container style={style}>
                <S.Host></S.Host>
                <S.Spacer />
                { operations.map(operationId => <Operation key={operationId} id={operationId} />) }
                <S.Spacer />
                <S.Role><RoleGlyph /></S.Role>
            </S.Container>
        </>
    );
};

export default Subroutine;
