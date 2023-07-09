import Dialog, { DialogTitle } from '@/components/Dialog';

import AddScriptButton from './AddScriptButton';

import type { DialogProps } from '@/components/Dialog';
import { ButtonContainer } from './ScriptSelectionDialog.styles';

const ScriptSelectionDialog: React.FC<DialogProps>
= (props) => {
    return (
        <Dialog {...props}>
            <DialogTitle>Scripts</DialogTitle>
            <ButtonContainer>
                <AddScriptButton />
            </ButtonContainer>
        </Dialog>
    );
};

ScriptSelectionDialog.displayName = 'ScriptSelectionDialog';
export default ScriptSelectionDialog;
