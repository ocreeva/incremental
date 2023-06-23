import { selectOperation } from '@/features/operations';
import { useAppSelector, useGlyph } from '@/hooks';

import * as S from './Operation.styles';

import type { CSSProperties } from 'react';

type OperationProps = {
    id: string;
}

const Operation: React.FC<OperationProps> = ({ id }) => {
    const { commandId, duration, progress } = useAppSelector(state => selectOperation(state, id));
    const { GlyphComponent } = useGlyph(commandId as string);

    const style = {
        '--operation_duration': `${duration}`,
        '--operation_progress': `${progress}%`,
    } as CSSProperties;

    return (
        <S.ProgressBorder style={style}>
            <S.Container>
                <S.GlyphContainer>
                    <GlyphComponent />
                </S.GlyphContainer>
            </S.Container>
        </S.ProgressBorder>
    );
};

export default Operation;
