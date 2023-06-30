import styled, { css } from 'styled-components';

import { ReactComponent as ScriptSvg } from '@/assets/script.svg';

export const ScriptButtonBase = css`
    grid-area: script;

    border-radius: 50%;
    height: 42px;
    width: 42px;

    margin: auto;
`;

export const ScriptGlow = styled.div`
    ${ScriptButtonBase};

    background: var(--color-highlight);
    filter: blur(3px);
`;

export const ScriptButton = styled.button`
    ${ScriptButtonBase};

    position: relative;

    background: var(--color-background);

    display: grid;
    place-content: center;
`;

export const ScriptIcon = styled(ScriptSvg)`
    height: 34px;
    width: 34px;
`;
