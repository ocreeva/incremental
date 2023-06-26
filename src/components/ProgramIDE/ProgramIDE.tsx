import { useState } from 'react';

import CommandList from '@/components/CommandList';
// import InstructionList from '@/components/InstructionList';
import Script from '@/components/Script';
import { useAppSelector } from '@/hooks';
//import { selectCurrentScript, selectCurrentScriptInstructions } from '@/features/program';

import * as S from './ProgramIDE.styles';
import { selectCurrentScriptId, selectScript } from '@/features/scripts';

enum FocusTarget {
    Commands,
    Instructions,
}

const FocusTargetContainer: Record<FocusTarget, typeof S.ContainerBase> = {
    [FocusTarget.Commands]: S.FocusOnCommands,
    [FocusTarget.Instructions]: S.FocusOnInstructions,
};

const ProgramIDE: React.FC = () => {
    const currentScriptId = useAppSelector(selectCurrentScriptId);

    const { instructions } = useAppSelector(state => selectScript(state, currentScriptId));
    const hasInstructions = instructions.length > 0;
    const [existingInstructionIds, setExistingInstructionIds] = useState(instructions);

    const [focusTarget, setFocusTarget] = useState(FocusTarget.Commands);

    if (!hasInstructions && (focusTarget === FocusTarget.Instructions)) setFocusTarget(FocusTarget.Commands);

    const handleCommandsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        if (focusTarget !== FocusTarget.Instructions) return;

        setExistingInstructionIds(instructions);
        setFocusTarget(FocusTarget.Commands);
    }

    const handleInstructionsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        if (!hasInstructions || (focusTarget === FocusTarget.Instructions)) return;

        setExistingInstructionIds(instructions);
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
                <Script id={currentScriptId} existingInstructionIds={existingInstructionIds} />
            </S.InstructionsContainer>
        </Container>
    );
};

export default ProgramIDE;
