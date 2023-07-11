import { createContext } from '@reach/utils';

import type { EntityId } from '@reduxjs/toolkit';

declare type ScriptSelectionContextProps = {
    scriptId: EntityId;
    setScriptId: React.Dispatch<React.SetStateAction<EntityId>>;
};

export const [ ScriptSelectionProvider, useScriptSelectionContext ] = createContext<ScriptSelectionContextProps>('ScriptSelectionContext');
