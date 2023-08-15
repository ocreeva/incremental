/**
 * Duplicated from GlowButton.styles.ts, due to the need to use AccordionButton for the button component.
 */

import styled from 'styled-components';
import { AccordionButton } from '@reach/accordion';

export const Container = styled.div`
    grid-area: expand;

    place-self: center;

    isolation: isolate;
    position: relative;
    height: fit-content;
    width: fit-content;
`;

export const Button = styled(AccordionButton)`
    background: var(--color-background);
    border-radius: 50%;
    display: block;
    position: relative;

    &::after {
        --glow-button_inset: min(0px, calc((100% - 42px) / 2));

        content: '';
        position: absolute;
        top: var(--glow-button_inset);
        bottom: var(--glow-button_inset);
        left: var(--glow-button_inset);
        right: var(--glow-button_inset);
    }
`;

export const Glow = styled.div`
    background: var(--color-highlight);
    border-radius: 50%;
    filter: blur(3px);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
`;
