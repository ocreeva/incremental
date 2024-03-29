import styled, { keyframes } from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const Overlay = styled(DialogOverlay)`
    animation: ${fadeIn} 150ms;
`;

const slideUp = keyframes`
    from { transform: translateY(calc(100% + 5vh)); }
    to { transform: none; }
`;

export const Border = styled(DialogContent)`
    --dialog_box-shadow: 1px 1px 2px hsla(0deg 0% 100% / 25%);

    position: absolute;
    left: 5vw;
    right: 5vw;
    bottom: 5vw;

    background: var(--color-empty);
    border-radius: 17px;
    box-shadow: inset var(--dialog_box-shadow);
    padding: 3px;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${slideUp} 350ms cubic-bezier(0.175, 0.885, 0.320, 1.15);
    }
`;

export const Container = styled.div`
    max-height: calc(100vh - 10vw - 6px);
    min-height: 42px;
    padding: 0.5rem;
    position: relative;
    width: 100%;

    background: var(--color-background);
    border-radius: 15px;
    box-shadow: var(--dialog_box-shadow);
`;
