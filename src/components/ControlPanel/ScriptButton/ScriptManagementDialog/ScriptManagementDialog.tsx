import Dialog, { DialogTitle } from '@/components/Dialog';
import ScriptSelection, { ScriptSelectionList } from '@/components/ScriptSelection';

import * as S from './ScriptManagementDialog.styles';
import CreateScriptButton from './CreateScriptButton';
import RemoveScriptButton from './RemoveScriptButton';

import type { DialogProps } from '@/components/Dialog';

const ScriptManagementDialog: React.FC<DialogProps>
= (props) => {
    return (
        <Dialog {...props}>
            <ScriptSelection>
                <DialogTitle>Scripts</DialogTitle>
                <ScriptSelectionList />
                <S.ButtonContainer>
                    <CreateScriptButton />
                    <RemoveScriptButton />
                </S.ButtonContainer>
            </ScriptSelection>
        </Dialog>
    );
};

ScriptManagementDialog.displayName = 'ScriptManagementDialog';
export default ScriptManagementDialog;
