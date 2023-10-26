import { useState } from 'react';
import styled from 'styled-components';
import { type DismissDialogEventHandler } from '@reach/dialog';

import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { ScriptSelectionDialog, type SelectScriptEventHandler } from '@/components/ScriptSelection';
import { assertIsDefined } from '@/core';
import { selectInstruction, updateInstruction } from '@/features/instructionData';
import { selectScript } from '@/features/scriptData';
import { useAppDispatch, useParamSelector } from '@/hooks';

import { useInstructionContext } from '../InstructionContext';

const ContentTargetScript: React.FC
= () => {
    const { instructionId } = useInstructionContext('ContentTargetScript');
    const { targetEntityId } = useParamSelector(selectInstruction, instructionId);

    assertIsDefined(targetEntityId, `Instruction '${instructionId}' does not have 'targetEntityId'.`);
    const { name: scriptName } = useParamSelector(selectScript, targetEntityId);

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => setDialogIsOpen(true);

    const handleDismiss: DismissDialogEventHandler
    = () => setDialogIsOpen(false);

    const dispatch = useAppDispatch();
    const handleSelect: SelectScriptEventHandler
    = (scriptId) => {
        dispatch(updateInstruction({
            id: instructionId,
            changes: { targetEntityId: scriptId },
        }));
    };

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Text} onClick={handleClick}>
                <Name>{ scriptName }</Name>
            </GlowButton>
            <ScriptSelectionDialog isOpen={dialogIsOpen} onDismiss={handleDismiss} onSelect={handleSelect} scriptId={targetEntityId} />
        </Container>
    );
};

const Container = styled.div`
    grid-area: script;

    display: grid;
    place-content: center;
`;

const Name = styled.div`
    width: calc(124px - 1rem);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

ContentTargetScript.displayName = 'ContentTargetScript';
export default ContentTargetScript;
