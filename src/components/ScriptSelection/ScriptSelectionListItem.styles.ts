import styled from 'styled-components';

export const Container = styled.label`
    background: var(--color-background);
    position: relative;
`;

export const Selection = styled.input.attrs(() => ({ type: 'radio' }))`
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

    ${Selection}:focus + & {
        outline: 1px solid var(--color-highlight);
    }
`;
