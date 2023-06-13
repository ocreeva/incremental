import styled from 'styled-components';

export const ButtonContent = styled.div`
    display: grid;
    justify-content: start;
    grid-template-areas:
        'title'
        'level'
    ;
    grid-template-columns: 1fr;
    grid-template-rows: 1rem 1fr;
    padding: 8px 4px;
`;

export const Name = styled.div`
    grid-area: title;
`;
