import styled, { keyframes } from 'styled-components';

import { Container as Lexicon } from '@/components/Lexicon/Lexicon.styles';
import { Container as Script } from '@/components/Script/Script.styles';
import { FocusOnLexicon, FocusOnScript } from '@/components/IDE/IDE.styles';

import { AnimatedContainer } from './GlyphPanel.styles';

export const Container = styled.div`
    min-height: var(--glyph-panel_glyph-container-size);

    display: grid;
    grid-template-areas:
        'glyph content'
    ;
    grid-template-columns: var(--glyph-panel_glyph-container-size) 1fr;
`;

export const GlyphContainer = styled.div`
    grid-area: glyph;

    display: grid;
    place-content: center;
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const scaleIn = keyframes`
    from {
        margin-inline-start: -25px;
        transform: translate(-50%) scale(5%);
    }
    to {
        margin-inline-start: 0;
        transform: scale(1);
    }
`;

export const ContentContainer = styled.div`
    margin-inline-start: 0;
    opacity: 1;
    transform: none;

    ${FocusOnLexicon} ${Lexicon} &,
    ${FocusOnScript} ${Script} & {
        margin-inline-start: 0;
        opacity: 1;
        transform: none;
    }

    ${FocusOnLexicon} ${Lexicon} ${AnimatedContainer} &,
    ${FocusOnScript} ${Script} ${AnimatedContainer} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${fadeIn} calc(var(--ide_focus-animation-duration) - 50ms) 200ms backwards, ${scaleIn} var(--ide_focus-animation-duration) 50ms backwards;
        }
    }

    ${FocusOnLexicon} ${Script} &,
    ${FocusOnScript} ${Lexicon} & {
        display: none;
    }
`;
