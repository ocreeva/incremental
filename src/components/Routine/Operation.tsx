import { selectOperation } from '@/features/operations';
import designs from '@/game/designs';
import { useAppSelector, useGlyph } from '@/hooks';
import type { EntityId } from '@/types';

import * as S from './Operation.styles';

declare type OperationProps = {
    id: EntityId;
};

const Operation: React.FC<OperationProps> = ({ id }) => {
    const { commandId, delay, duration, progress } = useAppSelector(state => selectOperation(state, id));
    const { glyphPath } = designs[commandId];
    const { GlyphComponent } = useGlyph(glyphPath);

    const style = {
        '--operation_delay': `${delay}`,
        '--operation_duration': `${duration}`,
        '--operation_progress': `${progress * 100}%`,
    } as React.CSSProperties;

    return (
        <S.ProgressBorder style={style}>
            <S.Container>
                <S.GlyphContainer>
                    <GlyphComponent className='glyph' />
                </S.GlyphContainer>
            </S.Container>
        </S.ProgressBorder>
    );
};

export default Operation;
