import { createContext } from '@reach/utils';

import { type EntityId } from '@/types';

export declare type SubmitEventHandler = (event: React.MouseEvent | React.KeyboardEvent) => void;

declare type ScriptSelectionContextProps = {
    onSubmit: SubmitEventHandler;
    scriptId: EntityId;
    setScriptId: React.Dispatch<React.SetStateAction<EntityId>>;
};

export const [ ScriptSelectionProvider, useScriptSelectionContext ] = createContext<ScriptSelectionContextProps>('ScriptSelectionContext');
