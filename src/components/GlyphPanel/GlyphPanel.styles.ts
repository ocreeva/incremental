import styled, { keyframes } from 'styled-components';
import { Container as Lexicon } from '@/components/Lexicon/Lexicon.styles';
import { Container as Script } from '@/components/Script/Script.styles';
import { FocusOnLexicon, FocusOnScript } from '@/components/IDE/IDE.styles';

const resizeGlyphOnly = keyframes`
    from { width: 100%; }
    to { width: min-content; }
`;
const resizeAllContent = keyframes`
    from { width: calc(var(--glyph-panel_glyph-container-size) + 10px); }
    to { width: 100%; }
`;

export const Container = styled.article`
    --glyph-panel_box-shadow: 2px 2px 5px hsla(0deg 0% 0% / 75%);
    --glyph-panel_glyph-container-size: calc(42px + 18px * var(--glyph_size, 0));

    background-color: var(--glyph-panel_border-color);
    border-radius: calc(13px + 5px * var(--glyph_size, 0));
    box-shadow: inset var(--glyph-panel_box-shadow);
    padding: 5px;

    ${FocusOnLexicon} ${Lexicon} &,
    ${FocusOnScript} ${Script} & {
        width: 100%;
    }

    ${FocusOnLexicon} ${Script} &,
    ${FocusOnScript} ${Lexicon} & {
        width: min-content;
    }
`;

export const AnimatedContainer = styled(Container)`
    ${FocusOnLexicon} ${Lexicon} &,
    ${FocusOnScript} ${Script} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${resizeAllContent} var(--ide_focus-animation-duration) ease-in-out;
        }
    }

    ${FocusOnLexicon} ${Script} &,
    ${FocusOnScript} ${Lexicon} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${resizeGlyphOnly} calc(var(--ide_unfocus-animation-duration) - 50ms) cubic-bezier(0.175, 0.885, 0.320, 1);
        }
    }
`;

export const GlyphPanel = styled.div`
    position: relative;
    min-height: var(--glyph-panel_glyph-container-size);

    background-color: var(--color-background);
    border-radius: calc(10px + 5px * var(--glyph_size, 0));
    box-shadow: var(--glyph-panel_box-shadow);

    display: grid;
    grid-template-areas:
        'glyph content'
    ;
    grid-template-columns: var(--glyph-panel_glyph-container-size) 1fr;
`;

export const GlyphContainer = styled.div`
    grid-area: glyph;

    height: 100%;
    width: 100%;

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
    --glyph_size: var(--glyph_size-small);

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
