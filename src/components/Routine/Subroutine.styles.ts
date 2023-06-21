import styled from 'styled-components';

export const Container = styled.div`
    /* --subroutine_duration: 42; */

    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 8px;
    padding-inline: calc(50vw - 21px);

    background: var(--color-background);
    filter: drop-shadow(0 0 2px var(--color-background));
    padding-block: 2px;

    &:first-of-type {
        padding-block-start: 4px;
    }
`;
