import { createContext } from '@reach/utils';

import type { EntityId } from '@/types';

declare type SelectionContextProps = {
    entityId: EntityId;
    name: string;
    setEntityId: React.Dispatch<React.SetStateAction<EntityId>>;
};

export const [ SelectionContext, useSelectionContext ] = createContext<SelectionContextProps>('SelectionContext');
