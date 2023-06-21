import * as S from './Operation.styles';
import { useGlyph } from '@/hooks';

import type { CSSProperties } from 'react';
import type { OperationState } from '@/types';

const Operation: React.FC<OperationState> = ({ commandId, duration, progress }) => {
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
