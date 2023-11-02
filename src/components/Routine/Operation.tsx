import { EntityId } from '@reduxjs/toolkit';

import { convertToGameTime } from '@/core';
import { selectCommandDesign } from '@/features/commandDesign';
import { selectOperation } from '@/features/operationView';
import { useParamSelector } from '@/hooks';

import * as S from './Operation.styles';
import { useOperationDialogContext } from './OperationDialogContext';

declare type OperationProps = {
    id: EntityId;
};

const Operation: React.FC<OperationProps> = ({ id }) => {
    const { commandId, delay, duration, progress } = useParamSelector(selectOperation, id);
    const { GlyphComponent } = useParamSelector(selectCommandDesign, commandId);
    const { setOperationId } = useOperationDialogContext('Operation');

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => setOperationId(id);

    const style = {
        '--operation_delay': delay && convertToGameTime(delay),
        '--operation_duration': convertToGameTime(duration),
        '--operation_progress': `${progress * 100}%`,
    } as React.CSSProperties;

    return (
        <S.ProgressBorder style={style} onClick={handleClick}>
            <S.Container>
                <S.GlyphContainer>
                    <GlyphComponent />
                </S.GlyphContainer>
            </S.Container>
        </S.ProgressBorder>
    );
};

export default Operation;
