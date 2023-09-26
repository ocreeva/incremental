import styled from 'styled-components';

import Dialog, { DialogButtons, DialogTitle } from '@/components/Dialog';
import { assert } from '@/core';
import { selectDesign } from '@/features/commands';
import { selectHostDesign } from '@/features/hosts';
import { selectOperation } from '@/features/operations';
import { selectRoleDesign } from '@/features/roles';
import { useParamSelector } from '@/hooks';

import { useOperationDialogContext } from './OperationDialogContext';

const OperationDialog: React.FC
= () => {
    const { isOpen, onDismiss, operationId } = useOperationDialogContext('OperationDialog');
    assert(operationId !== undefined, "Unexpected undefined 'operationId' in OperationDialog.");

    const { commandId, duration, host, progress, role } = useParamSelector(selectOperation, operationId);
    const { name } = useParamSelector(selectDesign, commandId);
    const { name: hostName } = useParamSelector(selectHostDesign, host);
    const { name: roleName } = useParamSelector(selectRoleDesign, role);

    const numberFormatOptions: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const durationValue = (duration / 50).toLocaleString(undefined, numberFormatOptions);
    const progressValue = (progress * 100).toLocaleString(undefined, numberFormatOptions);

    return (
        <Dialog isOpen={isOpen} onDismiss={onDismiss}>
            <DialogTitle>{ name }</DialogTitle>
            <Information>
                <Heading>Duration: </Heading>
                {durationValue}s ({progressValue}%)
            </Information>
            <Information>
                <Heading>Host: </Heading>
                {hostName}
            </Information>
            <Information>
                <Heading>Role: </Heading>
                {roleName}
            </Information>
            <DialogButtons removeCancelButton={true} />
        </Dialog>
    );
};

const Information = styled.p`
    margin-block-end: 4px;
`;
const Heading = styled.span`
    font-weight: 700;
`;

OperationDialog.displayName = 'OperationDialog';
export default OperationDialog;
