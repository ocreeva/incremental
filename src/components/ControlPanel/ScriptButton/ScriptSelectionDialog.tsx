import Dialog, { DialogTitle } from '@/components/Dialog';

import type { DialogProps } from '@/components/Dialog';

const ScriptSelectionDialog: React.FC<DialogProps>
= (props) => {
    return (
        <Dialog {...props}>
            <DialogTitle>Scripts</DialogTitle>
            Placeholder Content
        </Dialog>
    );
};

ScriptSelectionDialog.displayName = 'ScriptSelectionDialog';
export default ScriptSelectionDialog;