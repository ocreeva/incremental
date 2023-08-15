import { useAccordionContext } from './AccordionContext';
import { AccordionItemContextProvider } from './AccordionItemContext';
import AccordionState from './AccordionState';

declare type AccordionItemProps = {
    id: string;
};

const AccordionItem: React.FC<React.PropsWithChildren<AccordionItemProps>>
= ({ children, id: itemId }) => {
    const { id: accordionId, openPanel } = useAccordionContext('AccordionItem');

    const id = `${accordionId}_${itemId}`;
    const state = id === openPanel ? AccordionState.Open : AccordionState.Collapsed;

    return (
        <AccordionItemContextProvider id={id} state={state}>
            { children }
        </AccordionItemContextProvider>
    );
};

AccordionItem.displayName = 'AccordionItem';
export default AccordionItem;
