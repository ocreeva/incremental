import * as React from 'react';
import styled from 'styled-components';
import { composeEventHandlers } from '@reach/utils';
import { useDialogContext } from './DialogContext';
import DialogState from './DialogState';

export declare type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (event) => event.stopPropagation();

const DialogContent: React.FC<DialogContentProps>
= ({ onClick, ...props }) => {
    const { isOpen } = useDialogContext('DialogContent');

    return <Container
        aria-modal='true'
        role='dialog'
        tabIndex={-1}
        {...props}
        data-state={isOpen ? DialogState.Open : DialogState.Closed}
        onClick={composeEventHandlers(onClick, stopPropagation)}
    />;
};

const Container = styled.div`
    margin-inline: auto;
    background: var(--color-background);
`;

DialogContent.displayName = 'DialogContent';
export default DialogContent;
