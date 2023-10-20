import { createContext } from '@reach/utils';
import { EntityId } from '@reduxjs/toolkit';

export declare type EditSelectionContextProps = {
    isEditing?: boolean;
    onEditComplete?: () => void;
    onItemEdit?: React.Dispatch<string>;
}

declare type SelectionContextProps = {
    entityId: EntityId;
    name: string;
    setEntityId: React.Dispatch<React.SetStateAction<EntityId>>;
} & EditSelectionContextProps;

export const [ SelectionContext, useSelectionContext ] = createContext<SelectionContextProps>('SelectionContext');
