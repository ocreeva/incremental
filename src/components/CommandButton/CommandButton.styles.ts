import styled, { keyframes } from 'styled-components';
import { Container as CommandList } from '@/components/CommandList/CommandList.styles';
import { FocusOnCommands, FocusOnInstructions } from '@/components/ProgramIDE/ProgramIDE.styles';

const resizeGlyphOnly = keyframes`
    from { width: 100%; }
    to { width: calc(var(--command-button_glyph-size) + 2*var(--program-ide_button-border-size)); }
`;
const resizeAllContent = keyframes`
    from { width: calc(var(--command-button_glyph-size) + 2*var(--program-ide_button-border-size)); }
    to { width: 100%; }
`;

export const Container = styled.article`
    --command-button_box-shadow: 2px 2px 5px hsla(0deg 0% 0% / 100%);
    --command-button_border-radius: 15px;

    background-color: var(--command-button_border-color);
    border-radius: calc(var(--command-button_border-radius) + var(--program-ide_button-border-size));
    box-shadow: inset var(--command-button_box-shadow);
    padding: var(--program-ide_button-border-size);
    width: 100%;

    ${FocusOnCommands} ${CommandList} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${resizeAllContent} var(--program-ide_focus-animation-duration) ease-in-out;
        }
    }

    ${FocusOnInstructions} ${CommandList} & {
        width: calc(var(--command-button_glyph-size) + 2*var(--program-ide_button-border-size));

        @media (prefers-reduced-motion: no-preference) {
            animation: ${resizeGlyphOnly} calc(var(--program-ide_unfocus-animation-duration) - 50ms) cubic-bezier(0.175, 0.885, 0.320, 1);
        }
    }
`;

export const CommandButton = styled.div`
    position: relative;
    height: var(--command-button_glyph-size);

    background-color: var(--color-background);
    border-radius: var(--command-button_border-radius);
    box-shadow: var(--command-button_box-shadow);

    display: grid;
    grid-template-areas:
        'glyph content'
    ;
    grid-template-columns: var(--command-button_glyph-size) 1fr;
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const scaleIn = keyframes`
    from {
        margin-inline-start: -25px;
        transform: scale(5%);
    }
    to {
        margin-inline-start: 0;
        transform: scale(1);
    }
`;

export const ContentContainer = styled.div`
    ${FocusOnCommands} ${CommandList} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${fadeIn} calc(var(--program-ide_focus-animation-duration) - 50ms) 200ms backwards, ${scaleIn} var(--program-ide_focus-animation-duration) 50ms backwards;
        }
    }

    ${FocusOnInstructions} ${CommandList} & {
        margin-inline-start: -25px;
        opacity: 0;
        transform: scaleX(5%);
    }
`;
