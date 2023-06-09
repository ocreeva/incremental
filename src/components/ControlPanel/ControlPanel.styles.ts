import styled from 'styled-components';

import { ReactComponent as PauseIcon } from '@/assets/pause.svg';
import { ReactComponent as PlayIcon } from '@/assets/play.svg';

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

const PlayButtonBase = styled.button`
    grid-area: play;

    border-radius: 50%;
    height: 96px;
    margin-block-start: -20px;
    margin-block-end: -24px;
    width: 96px;
`;

export const PlayGlow = styled(PlayButtonBase).attrs({ as: 'div' })`
    background: var(--color-highlight);
    filter: blur(8px);
`;

export const PlayButton = styled(PlayButtonBase)`
    position: relative;

    background: var(--color-background);

    display: grid;
    place-content: center;
`;

export const Pause = styled(PauseIcon)`
    height: 100%;
    translate: 0 -6px;
    width: 100%;
`;

export const Play = styled(PlayIcon)`
    height: 100%;
    translate: 0 -6px;
    width: 100%;
`;
