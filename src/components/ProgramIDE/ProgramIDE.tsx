import { useState } from 'react';

import CommandList from '@/components/CommandList';
import InstructionList from '@/components/InstructionList';
import { useAppSelector } from '@/hooks';
import { selectCurrentScriptHasInstructions } from '@/features/program';

import * as S from './ProgramIDE.styles';

enum FocusTarget {
    Unspecified,
    Commands,
    Instructions,
}

const FocusTargetContainer = {
    [FocusTarget.Unspecified]: S.ContainerBase,
    [FocusTarget.Commands]: S.FocusOnCommands,
    [FocusTarget.Instructions]: S.FocusOnInstructions
};

const ProgramIDE: React.FC = () => {
    const currentScriptHasInstructions = useAppSelector(selectCurrentScriptHasInstructions);
    const [focusTarget, setFocusTarget] = useState(FocusTarget.Unspecified);

    // if (!currentScriptHasInstructions && (focusTarget === FocusTarget.Instructions)) setFocusTarget(FocusTarget.Commands);

    const handleCommandsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        // if (focusTarget !== FocusTarget.Instructions) return;
        setFocusTarget(FocusTarget.Commands);
    }

    const handleInstructionsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        // if (!currentScriptHasInstructions || (focusTarget === FocusTarget.Instructions)) return;
        setFocusTarget(FocusTarget.Instructions);
    }

    const Container = FocusTargetContainer[focusTarget];
    if (!Container) throw new Error(`No container specified for focus target: ${focusTarget}`);

    return (
        <Container>
            <S.CommandsContainer onClick={handleCommandsFocus}>
                <CommandList />
            </S.CommandsContainer>
            <S.InstructionsContainer onClick={handleInstructionsFocus}>
                {/* <InstructionList /> */}
            </S.InstructionsContainer>
        </Container>
    );
};

export default ProgramIDE;
