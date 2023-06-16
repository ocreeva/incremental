import styled from 'styled-components';

export const Container = styled.div`
    background: var(--color-background);
    filter: var(--app-section-filter);

    display: grid;
    grid-template-columns: 42px 42px 96px 42px 42px;
    grid-template-areas:
        'icon1 icon2 play icon3 icon4'
    ;
    justify-content: space-evenly;
`;
