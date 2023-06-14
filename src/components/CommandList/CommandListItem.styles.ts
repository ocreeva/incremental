import styled from 'styled-components';

import { ReactComponent as AddSvg } from '@/assets/add.svg';

export const ButtonContent = styled.div`
    display: grid;
    justify-content: start;
    grid-template-areas:
        'title add'
        'level add'
    ;
    grid-template-columns: 1fr 60px;
    grid-template-rows: 1rem 1fr;
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

export const AddIcon = styled(AddSvg)`
    height: 35px;
    width: 35px;
`;
