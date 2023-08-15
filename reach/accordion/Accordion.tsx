import { useState } from 'react';

import { AccordionContextProvider } from './AccordionContext';

declare type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
    id: string;
};

const Accordion: React.FC<AccordionProps>
= ({ id, ...props }) => {
    const [openPanel, setOpenPanel] = useState<string | undefined>(undefined);

    const onSelectPanel: (id: string) => void
    = (id) => setOpenPanel(id === openPanel ? undefined : id);

    return (
        <AccordionContextProvider id={id} openPanel={openPanel} onSelectPanel={onSelectPanel}>
            <div
                { ...props }
                data-reach-accordion=''
            />
        </AccordionContextProvider>
    )
};

Accordion.displayName = 'Accordion';
export default Accordion;
