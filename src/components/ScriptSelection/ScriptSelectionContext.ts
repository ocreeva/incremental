import { createContext } from '@reach/utils';

import { type EntityId } from '@/types';

declare type ScriptSelectionContextProps = {
    scriptId: EntityId;
    setScriptId: React.Dispatch<React.SetStateAction<EntityId>>;
};

export const [ ScriptSelection, useScriptSelectionContext ] = createContext<ScriptSelectionContextProps>('ScriptSelection');
