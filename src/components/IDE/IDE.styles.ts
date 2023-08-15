import styled, { keyframes } from 'styled-components';

import { FocusTarget } from '@/constants';

export const Container = styled.div`
    height: 100%;
    padding-inline: 12px;
    position: relative;

    display: flex;
    flex-direction: row;
    gap: 12px;

    --ide_focus-animation-duration: 300ms;
    --ide_focus-animation-timing-function: ease-in-out;
    --ide_focus-animation: var(--ide_focus-animation-duration) var(--ide_focus-animation-timing-function);

    --ide_unfocus-animation-duration: 250ms;
    --ide_unfocus-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.15);
    --ide_unfocus-animation: var(--ide_unfocus-animation-duration) var(--ide_unfocus-animation-timing-function);
`;

const slideIntoFocus = keyframes`
    from {
        translate: var(--ide_unfocus-translate);
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
        translate: var(--ide_unfocus-translate);
    }
`;

export const InnerContainerBase = styled.div`
    height: 100%;
    padding: 0;
    position: absolute;

    background: var(--color-background);
    border-radius: 15px;
    filter:
        drop-shadow(0 0 2px var(--color-background))
        drop-shadow(0 0 4px var(--color-background))
    ;

    overflow-y: auto;
    &::-webkit-scrollbar {
        background: transparent;
        width: 0;
    }
`;

export const LexiconContainer = styled(InnerContainerBase)`
    --ide_unfocus-translate: calc(74px - 100%);

    left: 12px;
    width: calc(100% - 92px);

    .${FocusTarget.Lexicon} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideIntoFocus} var(--ide_focus-animation);
        }
    }

    .${FocusTarget.Script} & {
        translate: var(--ide_unfocus-translate);

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideOutOfFocus} var(--ide_unfocus-animation);
        }
    }
`;

export const ScriptContainer = styled(InnerContainerBase)`
    --ide_unfocus-translate: calc(100% - 56px);

    right: 12px;
    width: calc(100% - 110px);

    .${FocusTarget.Lexicon} & {
        translate: var(--ide_unfocus-translate);

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideOutOfFocus} var(--ide_unfocus-animation);
        }
    }

    .${FocusTarget.Script} & {
        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideIntoFocus} var(--ide_focus-animation);
        }
    }
`;
