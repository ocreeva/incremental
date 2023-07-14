import { selectOperation } from '@/features/operations';
import { useAppSelector, useGlyph } from '@/hooks';
import { type EntityId } from '@/types';

import * as S from './Operation.styles';

declare type OperationProps = {
    id: EntityId;
};

const Operation: React.FC<OperationProps> = ({ id }) => {
    const { commandId, duration, progress } = useAppSelector(state => selectOperation(state, id));
    const { GlyphComponent } = useGlyph(commandId as string);

    const style = {
        '--operation_duration': `${duration}`,
        '--operation_progress': `${progress}%`,
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
