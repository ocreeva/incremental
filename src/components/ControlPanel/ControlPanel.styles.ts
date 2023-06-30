import styled from 'styled-components';

export const Container = styled.div`
    background: var(--color-background);
    filter:
        drop-shadow(0 0 2px var(--color-background))
        drop-shadow(0 0 4px var(--color-background))
    ;

    display: grid;
    grid-template-columns: 42px 42px 100px 42px 42px;
    grid-template-areas:
        'icon1 icon2 play script icon5'
    ;
    justify-content: space-evenly;
`;
