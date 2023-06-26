import { useState } from 'react';

import Lexicon from '@/components/Lexicon';
import Script from '@/components/Script';
import { useAppSelector } from '@/hooks';

import * as S from './IDE.styles';
import { selectCurrentScriptId, selectScript } from '@/features/scripts';

enum FocusTarget {
    Lexicon,
    Script,
}

const FocusTargetContainer: Record<FocusTarget, typeof S.ContainerBase> = {
    [FocusTarget.Lexicon]: S.FocusOnLexicon,
    [FocusTarget.Script]: S.FocusOnScript,
};

const IDE: React.FC = () => {
    const currentScriptId = useAppSelector(selectCurrentScriptId);

    const { instructions } = useAppSelector(state => selectScript(state, currentScriptId));
    const hasInstructions = instructions.length > 0;
    const [existingInstructionIds, setExistingInstructionIds] = useState(instructions);

    const [focusTarget, setFocusTarget] = useState(FocusTarget.Lexicon);

    if (!hasInstructions && (focusTarget === FocusTarget.Script)) setFocusTarget(FocusTarget.Lexicon);

    const handleCommandsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        if (focusTarget !== FocusTarget.Script) return;

        setExistingInstructionIds(instructions);
        setFocusTarget(FocusTarget.Lexicon);
    }

    const handleInstructionsFocus: React.MouseEventHandler<HTMLDivElement> = () => {
        if (!hasInstructions || (focusTarget === FocusTarget.Script)) return;

        setExistingInstructionIds(instructions);
        setFocusTarget(FocusTarget.Script);
    }

    const Container = FocusTargetContainer[focusTarget];
    if (!Container) throw new Error(`No container specified for focus target: ${focusTarget}`);

    return (
        <Container>
            <S.LexiconContainer onClick={handleCommandsFocus}>
                <Lexicon />
            </S.LexiconContainer>
            <S.ScriptContainer onClick={handleInstructionsFocus}>
                <Script id={currentScriptId} existingInstructionIds={existingInstructionIds} />
            </S.ScriptContainer>
        </Container>
    );
};

export default IDE;
