import { selectDesign } from '@/features/commands';
import { selectOperation } from '@/features/operations';
import { useGlyph, useParamSelector } from '@/hooks';
import type { EntityId } from '@/types';

import * as S from './Operation.styles';

declare type OperationProps = {
    id: EntityId;
};

const Operation: React.FC<OperationProps> = ({ id }) => {
    const { commandId, delay, duration, progress } = useParamSelector(selectOperation, id);
    const { glyphPath } = useParamSelector(selectDesign, commandId);
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
