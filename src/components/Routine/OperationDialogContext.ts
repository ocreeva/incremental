import { createContext } from '@reach/utils';
import { EntityId } from '@reduxjs/toolkit';

import { DialogProps } from '@/components/Dialog';

export declare type OperationDialogContextProps = DialogProps & {
    operationId?: EntityId;
    setOperationId: React.Dispatch<React.SetStateAction<EntityId | undefined>>;
};

export const [ OperationDialogContext, useOperationDialogContext ] = createContext<OperationDialogContextProps>('OperationDialogContext');
