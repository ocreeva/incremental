import { useState } from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';
import styled from 'styled-components';

import { ReactComponent as ScriptIcon } from '@/assets/script.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

import ScriptManagementDialog from './ScriptManagementDialog';

import type { DismissDialogEventHandler } from '@reach/dialog';

const ScriptButton: React.FC
= () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleDismissDialog: DismissDialogEventHandler
    = () => { setDialogIsOpen(false); };

    const handleOpenDialog: React.MouseEventHandler<HTMLButtonElement>
    = () => { setDialogIsOpen(true); };

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Circle} type='button' onClick={handleOpenDialog}>
                <ScriptIcon />
                <VisuallyHidden>Manage Scripts</VisuallyHidden>
            </GlowButton>
            <ScriptManagementDialog isOpen={dialogIsOpen} onDismiss={handleDismissDialog} />
        </Container>
    );
};

const Container = styled.div`
    grid-area: script;
    margin: auto;
`;

ScriptButton.displayName = 'ScriptButton';
export default ScriptButton;
