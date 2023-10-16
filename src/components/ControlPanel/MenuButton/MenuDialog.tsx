import styled from "styled-components";

import Dialog, { DialogProps } from "@/components/Dialog";
import ResetGameDialog from "./ResetGameDialog";
import { useState } from "react";
import { DismissDialogEventHandler } from "@reach/dialog";

const MenuDialog: React.FC<DialogProps>
= ({ onDismiss, ...props }) => {
    const [resetGameDialogIsOpen, setResetGameDialogIsOpen] = useState(false);

    const handleReset: React.MouseEventHandler<HTMLButtonElement>
    = (event) => {
        setResetGameDialogIsOpen(true);
        onDismiss(event);
    };

    const handleResetDismiss: DismissDialogEventHandler
    = () => { setResetGameDialogIsOpen(false); };

    return (
        <>
            <Dialog hideCloseButton={true} onDismiss={onDismiss} {...props}>
                <ButtonPanel>
                    <ResetButton onClick={handleReset}>Reset</ResetButton>
                </ButtonPanel>
            </Dialog>
            <ResetGameDialog isOpen={resetGameDialogIsOpen} onDismiss={handleResetDismiss} />
        </>
    );
};

const ButtonPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: -8px;

    background: var(--color-empty);
    border-radius: 15px;
    overflow: hidden;
`;

const Button = styled.button`
    background: var(--color-background);
    min-height: 42px;
    width: 100%;
`;

const ResetButton = styled(Button)`
    color: var(--color-reset);
`;

MenuDialog.displayName = 'MenuDialog';
export default MenuDialog;
