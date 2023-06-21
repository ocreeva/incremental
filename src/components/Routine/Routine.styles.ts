import styled from 'styled-components';

export const Container = styled.div`
    --glyph_size: 34px;
    /* --routine_duration: 42; */
    /* --routine_subroutine-count: 1; */

    flex: 0 0 calc(50px * var(--routine_subroutine-count) - 2px);
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
