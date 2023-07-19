import { createContext } from "@reach/utils";

export declare type CancelDialogEventHandler = (event: React.MouseEvent | React.KeyboardEvent) => void;
export declare type SubmitDialogEventHandler = (event: React.MouseEvent | React.KeyboardEvent) => void;
export declare type DialogContextProps = {
    onCancel: CancelDialogEventHandler;
    onSubmit: SubmitDialogEventHandler;
};

export const [DialogContextProvider, useDialogContext] = createContext<DialogContextProps>('DialogContext');
