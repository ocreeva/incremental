import styled, { css } from 'styled-components';

import { ReactComponent as PlaySvg } from '@/assets/play.svg';
import { ReactComponent as PlayFromStopSvg } from '@/assets/playFromStop.svg';
import { ReactComponent as StopSvg } from '@/assets/stop.svg';
import { ReactComponent as StopFromPlaySvg } from '@/assets/stopFromPlay.svg';

const PlayButtonBase = css`
    grid-area: play;

    border-radius: 50%;
    height: 96px;
    margin-block-start: -20px;
    margin-block-end: -24px;
    width: 96px;
`;

export const PlayGlow = styled.div`
    ${PlayButtonBase};

    background: var(--color-highlight);
    filter: blur(8px);
`;

export const PlayButton = styled.button`
    ${PlayButtonBase};

    position: relative;

    background: var(--color-background);

    display: grid;
    place-content: center;
`;

const IconBase = css`
    height: 100%;
    translate: 0 -6px;
    width: 100%;
`;

export const PlayIcon = styled(PlaySvg)`
    ${IconBase};
`;

export const AnimatedPlayIcon = styled(PlayFromStopSvg)`
    ${IconBase};
`;

export const StopIcon = styled(StopSvg)`
    ${IconBase};
`;

export const AnimatedStopIcon = styled(StopFromPlaySvg)`
    ${IconBase};
`;
