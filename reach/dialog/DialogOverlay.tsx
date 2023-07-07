import * as React from 'react';
import DialogInner from './DialogInner';
import DialogWrapper from './DialogWrapper';

import type { DialogInnerProps } from './DialogInner';
import type { DialogWrapperProps } from './DialogWrapper';

export declare type DialogOverlayProps = DialogWrapperProps & DialogInnerProps;

const DialogOverlay: React.FC<DialogOverlayProps>
= ({ isOpen = true, ...props }) => {
    return isOpen ? (
        <DialogWrapper isOpen={isOpen}>
            <DialogInner
                data-reach-dialog-overlay=''
                {...props}
            />
        </DialogWrapper>
    ) : null;
};

DialogOverlay.displayName = 'DialogOverlay';
export default DialogOverlay;
