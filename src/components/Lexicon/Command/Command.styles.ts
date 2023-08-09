import styled from 'styled-components';

export const PanelContent = styled.div`
    display: grid;
    gap: 5px;
    grid-template-areas:
        'title add'
        'level add'
    ;
    grid-template-columns: 1fr 42px;
    grid-template-rows: 1rem 1fr;
    justify-content: start;
    min-height: 60px;
    padding: 8px 4px;
`;

export const Name = styled.div`
    grid-area: title;
`;

export const AddContainer = styled.div`
    grid-area: add;

    display: grid;
    place-content: center;
`;

export const AddButton = styled.button`
    height: 42px;
    width: 42px;

    background: var(--color-empty);
    border-radius: 50%;

    display: grid;
    place-content: center;
`;
