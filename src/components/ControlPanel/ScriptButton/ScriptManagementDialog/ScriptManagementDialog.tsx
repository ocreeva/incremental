import { useState } from 'react';

import Dialog, {
    type CancelDialogEventHandler,
    type DialogProps,
    DialogTitle,
    DialogButtons,
    type SubmitDialogEventHandler
} from '@/components/Dialog';
import { ScriptSelectionList, useScriptSelection } from '@/components/ScriptSelection';
import { renameScript, selectCurrentScriptId, setCurrentScriptId } from '@/features/scriptData';
import { useAppDispatch, useAppSelector } from '@/hooks';

import CreateScriptButton from './CreateScriptButton';
import DeleteScriptButton from './DeleteScriptButton';
import RenameScriptButton from './RenameScriptButton';
import { ScriptManagementContext } from './ScriptManagementContext';

const ScriptManagementDialog: React.FC<DialogProps>
= (props) => {
    const dispatch = useAppDispatch();
    const currentScriptId = useAppSelector(selectCurrentScriptId);
    const [ScriptSelection, scriptId, setScriptId] = useScriptSelection(currentScriptId);

    const [isEditing, setIsEditing] = useState(false);

    const handleItemEdit: React.Dispatch<string>
    = (name) => { dispatch(renameScript({ scriptId, name })); };

    const handleEditComplete: () => void
    = () => setIsEditing(false);

    const handleCancel: CancelDialogEventHandler
    = () => {
        setIsEditing(false);
        setScriptId(currentScriptId);
    };

    const handleSubmit: SubmitDialogEventHandler
    = () => { dispatch(setCurrentScriptId(scriptId)); };

    return (
        <Dialog onCancel={handleCancel} onSubmit={handleSubmit} {...props}>
            <ScriptManagementContext setIsEditing={setIsEditing}>
                <DialogTitle>Scripts</DialogTitle>
                <ScriptSelection isEditing={isEditing} onEditComplete={handleEditComplete} onItemEdit={handleItemEdit}>
                    <ScriptSelectionList />
                    <DialogButtons removeCancelButton={true}>
                        <CreateScriptButton />
                        <RenameScriptButton />
                        <DeleteScriptButton />
                    </DialogButtons>
                </ScriptSelection>
            </ScriptManagementContext>
        </Dialog>
    );
};

ScriptManagementDialog.displayName = 'ScriptManagementDialog';
export default ScriptManagementDialog;
