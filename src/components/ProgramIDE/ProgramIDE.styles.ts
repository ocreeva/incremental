import styled, { keyframes } from 'styled-components';

export const ContainerBase = styled.div`
    --ide-section-padding: 8px;
    --program-ide_button-border-size: 6px;
    --instruction-glyph-size: 42px;
    --command-glyph-size: 60px;

    height: 100%;
    padding-inline: 12px;
    position: relative;

    display: flex;
    flex-direction: row;
    gap: var(--app-section-gap-width);

    --program-ide_focus-animation-duration: 300ms;
    --program-ide_focus-animation-timing-function: ease-in-out;
    --program-ide_focus-animation: var(--program-ide_focus-animation-duration) var(--program-ide_focus-animation-timing-function);

    --program-ide_unfocus-animation-duration: 250ms;
    --program-ide_unfocus-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.15);
    --program-ide_unfocus-animation: var(--program-ide_unfocus-animation-duration) var(--program-ide_unfocus-animation-timing-function);
`;

export const FocusOnCommands = styled(ContainerBase)``;
export const FocusOnInstructions = styled(ContainerBase)``;

const slideIntoFocus = keyframes`
    from {
        translate: var(--translate-when-unfocused);
    }
    to {
        translate: 0;
    }
`;

const slideOutOfFocus = keyframes`
    from {
        translate: 0;
    }
    to {
        translate: var(--translate-when-unfocused);
    }
`;

export const InnerContainerBase = styled.div`
    --translate-multiplier: 1;
    --translate-when-unfocused: calc(var(--translate-multiplier) * (var(--my-glyph-size) + 2*var(--ide-section-padding) + 2*var(--program-ide_button-border-size) - var(--app-section-gap-width) - 100%));

    height: 100%;
    padding: 0;
    position: absolute;
    width: calc(100% - 2*var(--app-section-gap-width) - 2*var(--ide-section-padding) - 2*var(--program-ide_button-border-size) - var(--other-glyph-size));

    background: var(--color-background);
    border-radius: 15px;
    filter: var(--app-section-filter);

    overflow-y: auto;
    &::-webkit-scrollbar {
        background: transparent;
        width: 0;
    }
`;

export const CommandsContainer = styled(InnerContainerBase)`
    --my-glyph-size: var(--command-glyph-size);
    --other-glyph-size: var(--instruction-glyph-size);

    left: var(--app-section-gap-width);

    ${FocusOnCommands} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideIntoFocus} var(--program-ide_focus-animation);
        }
    }

    ${FocusOnInstructions} & {
        translate: var(--translate-when-unfocused);

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideOutOfFocus} var(--program-ide_unfocus-animation);
        }
    }
`;

export const InstructionsContainer = styled(InnerContainerBase)`
    --my-glyph-size: var(--instruction-glyph-size);
    --other-glyph-size: var(--command-glyph-size);
    --translate-multiplier: -1;

    right: var(--app-section-gap-width);
    translate: var(--translate-when-unfocused);

    ${FocusOnCommands} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideOutOfFocus} var(--program-ide_unfocus-animation);
        }
    }

    ${FocusOnInstructions} & {
        translate: 0;

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideIntoFocus} var(--program-ide_focus-animation);
        }
    }
`;
