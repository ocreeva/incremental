import { DialogSubsection } from '@/components/Dialog';
import { IMessageDesign } from '@/types';

import * as S from './OperationDialog.styles';

declare type OperationDialogMessageProps = {
    message: IMessageDesign;
};

const OperationDialogMessage: React.FC<OperationDialogMessageProps>
= ({ message: { GlyphComponent, severity, text } }) => {

    return (
        <DialogSubsection>
            { GlyphComponent && (
                <S.Header>
                    <GlyphComponent />
                    <S.HeaderText>{ severity }</S.HeaderText>
                </S.Header>
            )}
            <S.Information>{ text }</S.Information>
        </DialogSubsection>
    );
};

OperationDialogMessage.displayName = 'OperationDialogMessage';
export default OperationDialogMessage;
