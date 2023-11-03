import { DialogSubsection } from '@/components/Dialog';
import { assert } from '@/core';
import { useParamSelector } from '@/hooks';

import * as S from './OperationDialog.styles';
import { useOperationDialogContext } from './OperationDialogContext';
import { selectOperationErrorDesign } from '@/features/errorDesign';

const OperationDialogError: React.FC
= () => {
    const { operationId } = useOperationDialogContext('OperationDialog');
    assert(operationId !== undefined, "Unexpected undefined 'operationId' in OperationDialogError.");

    const error = useParamSelector(selectOperationErrorDesign, operationId);
    if (error === null) return null;

    const { GlyphComponent, severity, text } = error;

    return (
        <DialogSubsection>
            <S.Header>
                <GlyphComponent />
                <S.HeaderText>{ severity }</S.HeaderText>
            </S.Header>
            <S.Information>{ text }</S.Information>
        </DialogSubsection>
    );
};

OperationDialogError.displayName = 'OperationDialogError';
export default OperationDialogError;
