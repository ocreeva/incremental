import styled from 'styled-components';

export const Container = styled.div`
    grid-area: glyph;

    height: 100%;
    width: 100%;

    display: grid;
    place-content: center;

    & > svg {
        height: var(--size);
        width: var(--size);
    }
`;
