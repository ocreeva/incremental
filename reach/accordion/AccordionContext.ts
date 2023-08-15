import { createContext } from '@reach/utils';

export declare type AccordionContextProps = {
    id: string;
    openPanel?: string;
    onSelectPanel: (id: string) => void;
};

export const [AccordionContextProvider, useAccordionContext] = createContext<AccordionContextProps>('AccordionContext');
