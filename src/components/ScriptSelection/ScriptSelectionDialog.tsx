import Dialog, {
    type CancelDialogEventHandler,
    type DialogProps,
    DialogTitle,
    DialogButtons,
    type SubmitDialogEventHandler
} from '@/components/Dialog';
import { ScriptSelectionList, useScriptSelection } from '@/components/ScriptSelection';
import { type EntityId } from '@/types';

export declare type SelectScriptEventHandler = (scriptId: EntityId, event: React.MouseEvent | React.KeyboardEvent) => void;

declare type ScriptSelectionDialogProps = Exclude<DialogProps, 'onSubmit'> & {
    onSelect: SelectScriptEventHandler;
    scriptId: EntityId;
};

const ScriptSelectionDialog: React.FC<ScriptSelectionDialogProps>
= ({ onSelect, scriptId: initialScriptId, ...props }) => {
    const [ScriptSelection, scriptId, setScriptId] = useScriptSelection(initialScriptId);

    const handleCancel: CancelDialogEventHandler
    = () => setScriptId(initialScriptId);

    const handleSubmit: SubmitDialogEventHandler
    = (event) => onSelect(scriptId, event);

    return (
        <Dialog onCancel={handleCancel} onSubmit={handleSubmit} {...props}>
            <DialogTitle>Select Script</DialogTitle>
            <ScriptSelection>
                <ScriptSelectionList />
            </ScriptSelection>
            <DialogButtons />
        </Dialog>
    );
};

ScriptSelectionDialog.displayName = 'ScriptSelectionDialog';
export default ScriptSelectionDialog;
