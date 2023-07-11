import Dialog, { DialogTitle } from '@/components/Dialog';

import * as S from './ScriptManagementDialog.styles';
import ScriptSelectionList from './ScriptSelectionList';
import AddScriptButton from './AddScriptButton';
import RemoveScriptButton from './RemoveScriptButton';

import type { DialogProps } from '@/components/Dialog';

const ScriptManagementDialog: React.FC<DialogProps>
= (props) => {
    return (
        <Dialog {...props}>
            <DialogTitle>Scripts</DialogTitle>
            <ScriptSelectionList />
            <S.ButtonContainer>
                <AddScriptButton />
                <RemoveScriptButton />
            </S.ButtonContainer>
        </Dialog>
    );
};

ScriptManagementDialog.displayName = 'ScriptManagementDialog';
export default ScriptManagementDialog;
