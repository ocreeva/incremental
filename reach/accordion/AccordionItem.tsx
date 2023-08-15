import { useAccordionContext } from './AccordionContext';
import { AccordionItemContextProvider } from './AccordionItemContext';
import AccordionState from './AccordionState';

declare type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
    id: string;
};

const AccordionItem: React.FC<AccordionItemProps>
= ({ id: itemId, ...props }) => {
    const { id: accordionId, openPanel } = useAccordionContext('AccordionItem');

    const id = `${accordionId}_${itemId}`;
    const state = id === openPanel ? AccordionState.Open : AccordionState.Collapsed;

    return (
        <AccordionItemContextProvider id={id} state={state}>
            <div
                { ...props }
                data-reach-accordion-item=''
                data-state={state as string}
            />
        </AccordionItemContextProvider>
    );
};

AccordionItem.displayName = 'AccordionItem';
export default AccordionItem;
