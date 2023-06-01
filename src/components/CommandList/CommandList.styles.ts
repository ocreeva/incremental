import styled from 'styled-components';

export const Container = styled.section`
    min-height: 100%;
    padding: var(--ide-section-padding);

    display: flex;
    align-items: flex-end;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
`;

export const ButtonContent = styled.div`
    display: grid;
    justify-content: start;
    grid-template-areas:
        'title'
        'progress'
    ;
    grid-template-columns: 1fr;
    grid-template-rows: 1rem 1fr;
    padding: 8px 4px;
`;

export const Title = styled.div`
    grid-area: title;
`;
