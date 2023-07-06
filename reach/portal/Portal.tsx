import * as React from 'react';
import { createPortal } from 'react-dom';
import { useForceUpdate } from '@reach/utils';

export declare type PortalProps = {
    children: React.ReactNode;
};

const Portal: React.FC<PortalProps>
= ({ children }) => {
    const containerRef = React.useRef<HTMLElement | null>(null);
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        const { body } = document;
        containerRef.current = document.createElement('reach-portal');
        body.appendChild(containerRef.current);
        forceUpdate();
        return () => { if (containerRef.current) body.removeChild(containerRef.current); };
    }, [forceUpdate]);

    return (
        containerRef.current
            ? createPortal(children, containerRef.current)
            : <></>
    );
};

Portal.displayName = 'Portal';

export default Portal;
