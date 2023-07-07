import * as React from 'react';
import { Portal } from '@reach/portal';
import { DialogContextProvider } from './DialogContext';
import DialogState from './DialogState';

export declare type DialogWrapperProps = {
    isOpen?: boolean;
};

const DialogWrapper: React.FC<React.PropsWithChildren<DialogWrapperProps>>
= ({ children, isOpen = true }) => {
    return (
        <Portal
            data-reach-dialog-wrapper=''
            data-state={isOpen ? DialogState.Open : DialogState.Closed}
        >
            <DialogContextProvider isOpen={isOpen}>
                { children }
            </DialogContextProvider>
        </Portal>
    );
};

DialogWrapper.displayName = 'DialogWrapper';
export default DialogWrapper;
