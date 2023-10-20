import { createContext } from "@reach/utils";

declare type ScriptManagementContextProps = {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const [ScriptManagementContext, useScriptManagementContext] = createContext<ScriptManagementContextProps>('ScriptManagementContext');
