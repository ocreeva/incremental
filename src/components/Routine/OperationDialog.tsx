import Dialog, { DialogButtons, DialogTitle } from '@/components/Dialog';
import { assert } from '@/core';
import { selectCommandDesign } from '@/features/commandDesign';
import { selectHostDesign } from '@/features/hostDesign';
import { selectOperation } from '@/features/operationView';
import { selectRoleDesign } from '@/features/roleDesign';
import { useParamSelector } from '@/hooks';

import * as S from './OperationDialog.styles';
import { useOperationDialogContext } from './OperationDialogContext';
import OperationDialogMessage from './OperationDialogMessage';
import { selectOperationMessageDesigns } from '@/features/messageDesign';

const OperationDialog: React.FC
= () => {
    const { isOpen, onDismiss, operationId } = useOperationDialogContext('OperationDialog');
    assert(operationId !== undefined, "Unexpected undefined 'operationId' in OperationDialog.");

    const { commandId, duration, host, progress, role, transition } = useParamSelector(selectOperation, operationId);
    const { name } = useParamSelector(selectCommandDesign, commandId);
    const { name: hostName } = useParamSelector(selectHostDesign, host);
    const { name: roleName } = useParamSelector(selectRoleDesign, role);

    const messages = useParamSelector(selectOperationMessageDesigns, operationId);

    const numberFormatOptions: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const durationValue = (duration / 1000).toLocaleString(undefined, numberFormatOptions);
    const progressValue = (progress * 100).toLocaleString(undefined, numberFormatOptions);
    const transitionValue = (transition / 1000).toLocaleString(undefined, numberFormatOptions);

    return (
        <Dialog isOpen={isOpen} onDismiss={onDismiss}>
            <DialogTitle>{ name }</DialogTitle>
            { transition > 0 && (
                <S.Information>
                    <S.Heading>Transition: </S.Heading>
                    {transitionValue}s
                </S.Information>
            ) }
            <S.Information>
                <S.Heading>Duration: </S.Heading>
                {durationValue}s ({progressValue}% complete)
            </S.Information>
            <S.Information>
                <S.Heading>Host: </S.Heading>
                {hostName}
            </S.Information>
            <S.Information>
                <S.Heading>Role: </S.Heading>
                {roleName}
            </S.Information>
            { messages.map(message => (<OperationDialogMessage key={message.id} message={message} />)) }
            <DialogButtons removeCancelButton={true} />
        </Dialog>
    );
};

OperationDialog.displayName = 'OperationDialog';
export default OperationDialog;
