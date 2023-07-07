import { useState } from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';

import * as S from './ScriptButton.styles';
import ScriptSelectionDialog from './ScriptSelectionDialog';

import type { DismissDialogEventHandler } from '@reach/dialog';

const ScriptButton: React.FC = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleDismissDialog: DismissDialogEventHandler
    = () => { setDialogIsOpen(false); };

    const handleOpenDialog: React.MouseEventHandler<HTMLButtonElement>
    = () => { setDialogIsOpen(true); };

    return (<>
        <S.ScriptGlow />
        <S.ScriptButton type='button' onClick={handleOpenDialog}>
            <S.ScriptIcon />
            <VisuallyHidden>Manage Scripts</VisuallyHidden>
        </S.ScriptButton>
        <ScriptSelectionDialog isOpen={dialogIsOpen} onDismiss={handleDismissDialog} />
    </>);
};

export default ScriptButton;
