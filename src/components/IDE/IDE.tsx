import { useState } from 'react';

import Lexicon from '@/components/Lexicon';
import Script from '@/components/Script';
import { FocusTarget } from '@/constants';
import { selectCurrentScriptId, selectScript } from '@/features/scripts';
import { useAppSelector, useParamSelector } from '@/hooks';

import * as S from './IDE.styles';

const IDE: React.FC = () => {
    const currentScriptId = useAppSelector(selectCurrentScriptId);

    const { instructions } = useParamSelector(selectScript, currentScriptId);
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

    return (
        <S.Container className={focusTarget as string}>
            <S.LexiconContainer onClick={handleCommandsFocus}>
                <Lexicon />
            </S.LexiconContainer>
            <S.ScriptContainer onClick={handleInstructionsFocus}>
                <Script existingInstructionIds={existingInstructionIds} />
            </S.ScriptContainer>
        </S.Container>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default IDE;
