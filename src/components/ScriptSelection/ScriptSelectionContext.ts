import { createContext } from '@reach/utils';

declare type ScriptSelectionContextProps = {
    scriptId: string;
    setScriptId: React.Dispatch<React.SetStateAction<string>>;
};

export const [ ScriptSelectionProvider, useScriptSelectionContext ] = createContext<ScriptSelectionContextProps>('ScriptSelectionContext');
