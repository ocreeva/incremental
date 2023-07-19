import styled, { css } from 'styled-components';

export const Container = styled.div`
    isolation: isolate;
    position: relative;
    height: fit-content;
    width: fit-content;
`;

export const circleShape = css`
    border-radius: 50%;
`;

export const rectShape = css`
    border-radius: 25%;
`;

export const textShape = css`
    border-radius: 0.25rem;
    padding: 0.125rem 0.5rem;
`;

export const ButtonBase = styled.button`
    background: var(--color-background);
    display: block;
    position: relative;

    &:disabled svg {
        opacity: 0.5;
    }

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

export const GlowBase = styled.div`
    background: var(--color-highlight);
    filter: blur(3px);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    ${ButtonBase}:disabled + & {
        filter: blur(1px);
    }
`;
