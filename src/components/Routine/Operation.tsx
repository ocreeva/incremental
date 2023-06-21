import { CSSProperties } from 'react';

import { OperationModel } from '@/types';

import * as S from './Operation.styles';
import { useGlyph } from '@/hooks';

const Operation: React.FC<OperationModel> = ({ commandId, duration, progress }) => {
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
