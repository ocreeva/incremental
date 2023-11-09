import { DialogSubsection } from '@/components/Dialog';
import { IErrorDesign } from '@/types';

import * as S from './OperationDialog.styles';

declare type OperationDialogErrorProps = {
    error: IErrorDesign;
};

const OperationDialogError: React.FC<OperationDialogErrorProps>
= ({ error: { GlyphComponent, severity, text } }) => {

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
