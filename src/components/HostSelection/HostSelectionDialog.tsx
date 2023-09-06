import Dialog, {
    type CancelDialogEventHandler,
    type DialogProps,
    DialogTitle,
    DialogButtons,
    type SubmitDialogEventHandler
} from '@/components/Dialog';
import { type Host } from '@/constants';

import HostSelectionList from './HostSelectionList';
import useHostSelection from './useHostSelection';

export declare type SelectHostEventHandler = (host: Host, event: React.MouseEvent | React.KeyboardEvent) => void;

declare type HostSelectionDialogProps = Exclude<DialogProps, 'onSubmit'> & {
    onSelect: SelectHostEventHandler;
    host: Host;
};

const HostSelectionDialog: React.FC<HostSelectionDialogProps>
= ({ onSelect, host: initialHost, ...props }) => {
    const [HostSelection, host, setHost] = useHostSelection(initialHost);

    const handleCancel: CancelDialogEventHandler
    = () => setHost(initialHost);

    const handleSubmit: SubmitDialogEventHandler
    = (event) => onSelect(host, event);

    return (
        <Dialog onCancel={handleCancel} onSubmit={handleSubmit} {...props}>
            <DialogTitle>Select Host</DialogTitle>
            <HostSelection>
                <HostSelectionList />
            </HostSelection>
            <DialogButtons />
        </Dialog>
    );
};

HostSelectionDialog.displayName = 'HostSelectionDialog';
export default HostSelectionDialog;
