import { type DismissDialogEventHandler } from '@reach/dialog';
import { VisuallyHidden } from '@reach/visually-hidden';

import * as S from './Dialog.styles';

export declare type DialogProps = {
    isOpen: boolean;
    onDismiss: DismissDialogEventHandler;
};

const Dialog: React.FC<React.PropsWithChildren<DialogProps>>
= ({ children, isOpen, onDismiss }) => {
    return (
        <S.Overlay isOpen={isOpen} onDismiss={onDismiss}>
            <S.Border>
                <S.Container>
                    { children }
                    <S.Close onClick={onDismiss}>
                        <S.CloseIcon />
                        <VisuallyHidden>Close Dialog</VisuallyHidden>
                    </S.Close>
                </S.Container>
            </S.Border>
        </S.Overlay>
    );
};

Dialog.displayName = 'Dialog';
export default Dialog;
