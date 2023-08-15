import styled, { keyframes } from 'styled-components';

import { Container as Lexicon } from '@/components/Lexicon/Lexicon.styles';
import { Container as Script } from '@/components/Script/Script.styles';
import { FocusTarget } from '@/constants';

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

    .${FocusTarget.Lexicon} ${Lexicon} &,
    .${FocusTarget.Script} ${Script} & {
        width: 100%;
    }

    .${FocusTarget.Lexicon} ${Script} &,
    .${FocusTarget.Script} ${Lexicon} & {
        width: min-content;
    }
`;

export const AnimatedContainer = styled(Container)`
    .${FocusTarget.Lexicon} ${Lexicon} &,
    .${FocusTarget.Script} ${Script} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${resizeAllContent} var(--ide_focus-animation-duration) ease-in-out;
        }
    }

    .${FocusTarget.Lexicon} ${Script} &,
    .${FocusTarget.Script} ${Lexicon} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${resizeGlyphOnly} calc(var(--ide_unfocus-animation-duration) - 50ms) cubic-bezier(0.175, 0.885, 0.320, 1);
        }
    }
`;

export const Content = styled.div`
    background-color: var(--color-background);
    border-radius: calc(10px + 5px * var(--glyph_size, 0));
    box-shadow: var(--glyph-panel_box-shadow);
`;
