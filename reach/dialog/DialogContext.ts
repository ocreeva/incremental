import { createContext } from "@reach/utils";

export declare type DialogContextProps = {
    isOpen: boolean;
};

export const [DialogContextProvider, useDialogContext] = createContext<DialogContextProps>('DialogContext');
