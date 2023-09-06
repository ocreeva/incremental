import { useState } from 'react';

import Dialog, {
    type CancelDialogEventHandler,
    type DialogProps,
    DialogTitle,
    DialogButtons,
    type SubmitDialogEventHandler
} from '@/components/Dialog';
import { SelectionContext } from '@/components/SelectionList';
import { type Host } from '@/constants';
import type { EntityId } from '@/types';

import HostSelectionList from './HostSelectionList';

export declare type SelectHostEventHandler = (host: Host, event: React.MouseEvent | React.KeyboardEvent) => void;

declare type HostSelectionDialogProps = Exclude<DialogProps, 'onSubmit'> & {
    onSelect: SelectHostEventHandler;
    host: Host;
};

const HostSelectionDialog: React.FC<HostSelectionDialogProps>
= ({ onSelect, host: initialHost, ...props }) => {
    const [host, setHost] = useState(initialHost);

    const setEntityId: React.Dispatch<React.SetStateAction<EntityId>>
    = (entityId) => setHost(entityId as Host);

    const handleCancel: CancelDialogEventHandler
    = () => setHost(initialHost);

    const handleSubmit: SubmitDialogEventHandler
    = (event) => onSelect(host, event);

    return (
        <Dialog onCancel={handleCancel} onSubmit={handleSubmit} {...props}>
            <DialogTitle>Select Host</DialogTitle>
            <SelectionContext entityId={host} name='host' setEntityId={setEntityId} {...props}>
                <HostSelectionList />
            </SelectionContext>
            <DialogButtons />
        </Dialog>
    );
};

HostSelectionDialog.displayName = 'HostSelectionDialog';
export default HostSelectionDialog;
