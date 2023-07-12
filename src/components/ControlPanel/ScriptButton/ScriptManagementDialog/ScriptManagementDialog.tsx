import Dialog, { DialogTitle } from '@/components/Dialog';
import ScriptSelection, { ScriptSelectionList } from '@/components/ScriptSelection';
import { setCurrentScriptId } from '@/features/scripts';
import { useAppDispatch } from '@/hooks';

import * as S from './ScriptManagementDialog.styles';
import CreateScriptButton from './CreateScriptButton';
import DeleteScriptButton from './DeleteScriptButton';
import OkButton from './OkButton';

import type { DialogProps } from '@/components/Dialog';
import type { SubmitCallback } from '@/components/ScriptSelection';

const ScriptManagementDialog: React.FC<DialogProps>
= ({ onDismiss, ...props }) => {
    const dispatch = useAppDispatch();
    const submit: SubmitCallback
    = (scriptId, event) => {
        dispatch(setCurrentScriptId(scriptId));
        onDismiss(event);
    };

    return (
        <Dialog onDismiss={onDismiss} {...props}>
            <ScriptSelection submit={submit}>
                <DialogTitle>Scripts</DialogTitle>
                <ScriptSelectionList />
                <S.ButtonContainer>
                    <CreateScriptButton />
                    <DeleteScriptButton />
                    <OkButton />
                </S.ButtonContainer>
            </ScriptSelection>
        </Dialog>
    );
};

ScriptManagementDialog.displayName = 'ScriptManagementDialog';
export default ScriptManagementDialog;
