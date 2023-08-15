import { useAccordionItemContext } from './AccordionItemContext';
import AccordionState from './AccordionState';

const AccordionPanel: React.FC<React.HTMLAttributes<HTMLDivElement>>
= (props) => {
    const { id, state } = useAccordionItemContext('AccordionPanel');

    return (
        <div
            hidden={state !== AccordionState.Open}
            role='region'
            area-aria-labelledby={`${id}_button`}
            {...props}
            data-reach-accordion-panel=''
            data-state={state as string}
            id={`${id}_panel`}
        />
    );
};

AccordionPanel.displayName = 'AccordionPanel';
export default AccordionPanel;
