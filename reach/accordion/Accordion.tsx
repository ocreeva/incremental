import { useState } from 'react';

import { AccordionContextProvider } from './AccordionContext';

declare type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
    id: string;
};

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>>
= ({ id, children }) => {
    const [openPanel, setOpenPanel] = useState<string | undefined>(undefined);

    const onSelectPanel: (id: string) => void
    = (id) => setOpenPanel(id === openPanel ? undefined : id);

    return (
        <AccordionContextProvider id={id} openPanel={openPanel} onSelectPanel={onSelectPanel}>
            { children }
        </AccordionContextProvider>
    )
};

Accordion.displayName = 'Accordion';
export default Accordion;
