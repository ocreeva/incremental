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

export const ButtonBase = styled.button`
    background: var(--color-background);
    border-radius: 25%;
    display: block;
    position: relative;

    &:disabled svg {
        opacity: 0.5;
    }
`;

export const GlowBase = styled.div`
    background: var(--color-highlight);
    border-radius: 25%;
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
