import styled from 'styled-components';

export const Container = styled.div`
    /* --routine_duration: 42; */

    flex: 0 0 fit-content;
    width: 100%;

    background: var(--color-empty);
    filter: drop-shadow(0 0 4px var(--color-background));

    overflow-x: auto;
    &::-webkit-scrollbar {
        background: transparent;
        height: 0;
    }
`;

export const ScrollRegion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: calc(100vw + var(--routine_duration) * 1px - 42px);
`;
