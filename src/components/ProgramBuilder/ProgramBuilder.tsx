import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import CommandList from '@/components/CommandList';
import InstructionList from '@/components/InstructionList';

const ProgramBuilder: React.FC = () => {
    const [focusCommands, setFocusCommands] = useState(true);

    const Container = focusCommands ? ContainerFocusCommands : ContainerFocusInstructions;

    const handleCommandsFocus: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setFocusCommands(true);
    }

    const handleInstructionsFocus: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setFocusCommands(false);
    }

    return (
        <Container>
            <InstructionsContainer disabled={!focusCommands} onClick={handleInstructionsFocus}>
                <InstructionList />
            </InstructionsContainer>
            <CommandsContainer disabled={focusCommands} onClick={handleCommandsFocus}>
                <CommandList />
            </CommandsContainer>
        </Container>
    );
};

const ContainerBase = styled.main`
    position: relative;
    height: 100%;

    --animation-focus: 400ms ease-out;
    --animation-unfocus: 350ms cubic-bezier(0.175, 0.885, 0.320, 1.15);

    --focus-width: 60px;
    --gap-width: 4px;
`;

const ContainerFocusInstructions = styled(ContainerBase)``;
const ContainerFocusCommands = styled(ContainerBase)``;

const slideRight = keyframes`
    from {
        translate: calc(var(--focus-width) - 100%);
    }
    to {
        translate: 0px;
    }
`;

const slideLeft = keyframes`
    from {
        translate: calc(100% - var(--focus-width));
    }
    to {
        translate: 0;
    }
`;

const InnerContainerBase = styled.button`
    background: transparent;

    position: absolute;
    height: 100%;
    padding: 0;
    width: calc(100% - var(--focus-width) - var(--gap-width));

    border: 1px solid black;

    overflow: auto;
    &::-webkit-scrollbar {
        background: transparent;
        width: 0;
    }
`;

const InstructionsContainer = styled(InnerContainerBase)`
    border-inline-start: 0;

    ${ContainerFocusCommands} & {
        right: calc(100% - var(--focus-width));

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideLeft} var(--animation-unfocus);
        }
    }

    ${ContainerFocusInstructions} & {
        right: calc(var(--focus-width) + var(--gap-width));

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideRight} var(--animation-focus);
        }
    }
`;

const CommandsContainer = styled(InnerContainerBase)`
    border-inline-end: 0;

    ${ContainerFocusCommands} & {
        left: calc(var(--focus-width) + var(--gap-width));

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideLeft} var(--animation-focus);
        }
    }

    ${ContainerFocusInstructions} & {
        left: calc(100% - var(--focus-width));

        @media (prefers-reduced-motion: no-preference) {
            animation: ${slideRight} var(--animation-unfocus);
        }
    }
`;

const SwapFocus = styled.button`
    background: transparent;
    border: 0;

    position: absolute;
    height: 100%;
    width: var(--focus-width);

    ${ContainerFocusCommands} & {
        left: 0;
    }

    ${ContainerFocusInstructions} & {
        right: 0;
    }
`;

export default ProgramBuilder;
