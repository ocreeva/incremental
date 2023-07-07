import * as React from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import styled from 'styled-components';
import { composeEventHandlers, noop } from '@reach/utils';
import DialogState from './DialogState';
import { useDialogContext } from './DialogContext';

declare type DismissEventHandler = (event: React.MouseEvent | React.KeyboardEvent) => void;

export declare type DialogInnerProps = React.HTMLAttributes<HTMLDivElement> & {
    allowPinchZoom?: boolean;
    onDismiss?: DismissEventHandler;
};
const DialogInner: React.FC<DialogInnerProps>
= ({
    allowPinchZoom,
    onClick,
    onDismiss = noop,
    onKeyDown,
    onMouseDown,
    ...props
}) => {
    const { isOpen } = useDialogContext('DialogInner');

    const mouseTargetRef = React.useRef<EventTarget | null>(null);
    const overlayNodeRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!overlayNodeRef.current) return noop;
        const body = document.body;
        let portal: Node = overlayNodeRef.current;
        while (portal.parentNode !== null && portal.parentNode !== body) portal = portal.parentNode;
        return createAriaHiddenEffect(portal);
    });

    const handleClick: React.MouseEventHandler
    = (event) => {
        if (mouseTargetRef.current !== event.target) return;
        event.stopPropagation();
        onDismiss(event);
    };

    const handleKeyDown: React.KeyboardEventHandler
    = (event) => {
        switch (event.key) {
            case 'Escape':
                event.stopPropagation();
                onDismiss(event);
                break;
        }
    };

    const handleMouseDown: React.MouseEventHandler
    = ({ target }) => { mouseTargetRef.current = target; };

    return (
        <FocusLock
            autoFocus
            crossFrame
            returnFocus
            disabled={!isOpen}
        >
            <RemoveScroll
                allowPinchZoom={allowPinchZoom}
                enabled={isOpen}
            >
                <Container
                    {...props}
                    ref={overlayNodeRef}
                    data-reach-inner-dialog=''
                    data-state={isOpen ? DialogState.Open : DialogState.Closed}
                    onClick={composeEventHandlers(onClick, handleClick)}
                    onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
                    onMouseDown={composeEventHandlers(onMouseDown, handleMouseDown)}
                />
            </RemoveScroll>
        </FocusLock>
    )
};

const Container = styled.div`
    background: hsla(0deg 0% 0% / 60%);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const createAriaHiddenEffect: (portal: Node) => React.EffectCallback
= (portal) => {
    const { ownerDocument } = portal;
    const children = ownerDocument?.body.children;
    if (!children) return noop;

    const originalValues: (string|null)[] = [];
    const rootNodes: Element[] = [];
    for (let index = 0; index < children.length; index++) {
        const node = children[index];
        if (node === portal) continue;

        const ariaHidden = node.getAttribute('aria-hidden');
        if (ariaHidden !== null && ariaHidden !== 'false') continue;

        originalValues.push(ariaHidden);
        rootNodes.push(node);
        node.setAttribute('aria-hidden', 'true');
    }

    return () => {
        rootNodes.forEach((node, index) => {
            const ariaHidden = originalValues[index];
            if (ariaHidden === null) {
                node.removeAttribute('aria-hidden');
            } else {
                node.setAttribute('aria-hidden', ariaHidden);
            }
        });
    };
};

DialogInner.displayName = 'DialogInner';
export default DialogInner;
