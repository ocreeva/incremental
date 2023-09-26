import { createContext } from '@reach/utils';

import { type DialogProps } from '@/components/Dialog';
import type { EntityId } from '@/types';

export declare type OperationDialogContextProps = DialogProps & {
    operationId?: EntityId;
    setOperationId: React.Dispatch<React.SetStateAction<EntityId | undefined>>;
};

export const [ OperationDialogContext, useOperationDialogContext ] = createContext<OperationDialogContextProps>('OperationDialogContext');
