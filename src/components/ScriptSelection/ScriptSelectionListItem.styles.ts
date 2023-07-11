import styled from 'styled-components';

export const Container = styled.label`
    background: var(--color-background);
    position: relative;
`;

export const Selection = styled.input.attrs(_ => ({ type: 'radio' }))`
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
`;

export const Content = styled.div`
    line-height: 1.5;
    padding: 8px 16px;

    ${Selection}:checked + & {
        box-shadow: inset 0px 0px 10px var(--color-highlight);
    }
`;
