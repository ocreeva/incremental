import { selectDesign } from '@/features/commands';
import { selectOperation } from '@/features/operations';
import { useParamSelector } from '@/hooks';
import type { EntityId } from '@/types';

import * as S from './Operation.styles';
import { useOperationDialogContext } from './OperationDialogContext';

declare type OperationProps = {
    id: EntityId;
};

const Operation: React.FC<OperationProps> = ({ id }) => {
    const { commandId, delay, duration, progress } = useParamSelector(selectOperation, id);
    const { GlyphComponent } = useParamSelector(selectDesign, commandId);
    const { setOperationId } = useOperationDialogContext('Operation');

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => setOperationId(id);

    const style = {
        '--operation_delay': `${delay}`,
        '--operation_duration': `${duration}`,
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
