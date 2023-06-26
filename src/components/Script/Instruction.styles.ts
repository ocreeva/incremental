import styled from 'styled-components';

import { ReactComponent as RemoveSvg } from '@/assets/remove.svg';

export const ButtonContent = styled.div`
    display: grid;
    grid-template-areas:
        '_ remove'
    ;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 42px;
`;

export const RemoveButton = styled.button`
    grid-area: remove;

    height: 42px;
    width: 42px;

    display: grid;
    place-content: center;
`;

export const RemoveIcon = styled(RemoveSvg)`
    height: 34px;
    width: 34px;

    background: var(--color-empty);
    border-radius: 50%;
`;
