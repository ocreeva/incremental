import { type DismissDialogEventHandler } from '@reach/dialog';

import * as S from './Dialog.styles';
import CloseButton from './CloseButton';
import { type CancelDialogEventHandler, DialogContextProvider, type SubmitDialogEventHandler } from './DialogContext';

export declare type DialogProps = {
    isOpen: boolean;
    onCancel?: CancelDialogEventHandler;
    onDismiss: DismissDialogEventHandler;
    onSubmit?: SubmitDialogEventHandler;
};

const Dialog: React.FC<React.PropsWithChildren<DialogProps>>
= ({ children, isOpen, onCancel, onDismiss, onSubmit }) => {
    const handleCancel: DismissDialogEventHandler
    = onCancel ? (event) => {
        onCancel(event);
        if (event.defaultPrevented) return;
        onDismiss(event);
    } : onDismiss;

    const handleSubmit: SubmitDialogEventHandler
    = onSubmit ? (event) => {
        onSubmit(event);
        if (event.defaultPrevented) return;
        onDismiss(event);
    } : onDismiss;

    return (
        <S.Overlay isOpen={isOpen} onDismiss={handleCancel}>
            <S.Border>
                <S.Container>
                    <DialogContextProvider onCancel={handleCancel} onSubmit={handleSubmit}>
                        { children }
                        <CloseButton />
                    </DialogContextProvider>
                </S.Container>
            </S.Border>
        </S.Overlay>
    );
};

Dialog.displayName = 'Dialog';
export default Dialog;
