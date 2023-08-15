import { useRef } from 'react';

import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';
import AccordionState from './AccordionState';

const AccordionButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
= ({ children, ...props }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const { onSelectPanel } = useAccordionContext('AccordionButton');
    const { id, state } = useAccordionItemContext('AccordionButton');

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = (event) => {
        event.preventDefault();
        buttonRef.current?.focus();
        onSelectPanel(id);
    };

    return (
        <button
            aria-controls={`${id}_panel`}
            aria-expanded={state === AccordionState.Open}
            { ...props }
            ref={buttonRef}
            data-reach-accordion-button=''
            data-state={state as string}
            id={`${id}_button`}
            onClick={handleClick}
        >
            { children }
        </button>
    );
};

AccordionButton.displayName = 'AccordionButton';
export default AccordionButton;
