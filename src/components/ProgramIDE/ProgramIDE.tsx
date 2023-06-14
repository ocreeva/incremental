import { useState } from 'react';

import CommandList from '@/components/CommandList';
import InstructionList from '@/components/InstructionList';
import { useAppSelector } from '@/hooks';
import { selectCurrentScript, selectCurrentScriptInstructions } from '@/features/program';

import * as S from './ProgramIDE.styles';

enum FocusTarget {
    Commands,
    Instructions,
}

const FocusTargetContainer: Record<FocusTarget, typeof S.ContainerBase> = {
    [FocusTarget.Commands]: S.FocusOnCommands,
    [FocusTarget.Instructions]: S.FocusOnInstructions,
};

const ProgramIDE: React.FC = () => {
    const currentScriptInstructions = useAppSelector(selectCurrentScriptInstructions);
    const currentScriptHasInstructions = currentScriptInstructions.length > 0;

    const { instructions } = useAppSelector(selectCurrentScript);
    const [existingInstructionIds, setExistingInstructionIds] = useState(instructions.map(instruction => instruction.id));

    const [focusTarget, setFocusTarget] = useState(FocusTarget.Commands);

    if (!currentScriptHasInstructions && (focusTarget === FocusTarget.Instructions)) setFocusTarget(FocusTarget.Commands);

    const handleCommandsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        if (focusTarget !== FocusTarget.Instructions) return;

        setExistingInstructionIds(instructions.map(instruction => instruction.id));
        setFocusTarget(FocusTarget.Commands);
    }

    const handleInstructionsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        if (!currentScriptHasInstructions || (focusTarget === FocusTarget.Instructions)) return;

        setExistingInstructionIds(instructions.map(instruction => instruction.id));
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
                <InstructionList existingInstructionIds={existingInstructionIds} />
            </S.InstructionsContainer>
        </Container>
    );
};

export default ProgramIDE;
