import { createContext } from '@reach/utils';

import AccordionState from './AccordionState';

export declare type AccordionItemContextProps = {
    id: string;
    state: AccordionState;
};

export const [AccordionItemContextProvider, useAccordionItemContext] = createContext<AccordionItemContextProps>('AccordionItemContext');
