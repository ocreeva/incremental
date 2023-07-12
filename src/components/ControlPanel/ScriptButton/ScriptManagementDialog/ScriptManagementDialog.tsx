import Dialog, { DialogTitle } from '@/components/Dialog';
import ScriptSelection, { ScriptSelectionList } from '@/components/ScriptSelection';

import * as S from './ScriptManagementDialog.styles';
import CreateScriptButton from './CreateScriptButton';
import DeleteScriptButton from './DeleteScriptButton';
import OkButton from './OkButton';

import type { DialogProps } from '@/components/Dialog';

const ScriptManagementDialog: React.FC<DialogProps>
= ({ onDismiss, ...props }) => {
    return (
        <Dialog onDismiss={onDismiss} {...props}>
            <ScriptSelection>
                <DialogTitle>Scripts</DialogTitle>
                <ScriptSelectionList />
                <S.ButtonContainer>
                    <CreateScriptButton />
                    <DeleteScriptButton />
                    <OkButton onDismiss={onDismiss} />
                </S.ButtonContainer>
            </ScriptSelection>
        </Dialog>
    );
};

ScriptManagementDialog.displayName = 'ScriptManagementDialog';
export default ScriptManagementDialog;
