import Dialog, {
    type CancelDialogEventHandler,
    type DialogProps,
    DialogTitle,
    DialogButtons,
    type SubmitDialogEventHandler
} from '@/components/Dialog';
import { ScriptSelectionList, useScriptSelection } from '@/components/ScriptSelection';
import { selectCurrentScriptId, setCurrentScriptId } from '@/features/scripts';
import { useAppDispatch, useAppSelector } from '@/hooks';

import CreateScriptButton from './CreateScriptButton';
import DeleteScriptButton from './DeleteScriptButton';

const ScriptManagementDialog: React.FC<DialogProps>
= (props) => {
    const dispatch = useAppDispatch();
    const currentScriptId = useAppSelector(selectCurrentScriptId);
    const [ScriptSelection, scriptId, setScriptId] = useScriptSelection(currentScriptId);

    const handleCancel: CancelDialogEventHandler
    = () => setScriptId(currentScriptId);

    const handleSubmit: SubmitDialogEventHandler
    = () => { dispatch(setCurrentScriptId(scriptId)); };

    return (
        <Dialog onCancel={handleCancel} onSubmit={handleSubmit} {...props}>
            <DialogTitle>Scripts</DialogTitle>
            <ScriptSelection>
                <ScriptSelectionList />
                <DialogButtons removeCancelButton={true}>
                    <CreateScriptButton />
                    <DeleteScriptButton />
                </DialogButtons>
            </ScriptSelection>
        </Dialog>
    );
};

ScriptManagementDialog.displayName = 'ScriptManagementDialog';
export default ScriptManagementDialog;
