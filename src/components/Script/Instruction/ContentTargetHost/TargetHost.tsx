import { useState } from 'react';
import styled from 'styled-components';
import { type DismissDialogEventHandler } from '@reach/dialog';

import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { HostSelectionDialog, type SelectHostEventHandler } from '@/components/HostSelection';
import { Host } from '@/constants';
import { assert } from '@/core';
import { selectInstruction, updateInstruction } from '@/features/instructions';
import { useAppDispatch, useParamSelector } from '@/hooks';

import { useInstructionContext } from '../InstructionContext';

// BUGBUG: duplicate definiton for hosts array, Host name record
const hosts = Object.values(Host);
const hostName: Record<Host, string> = {
    [Host.Core]: 'Core',
    [Host.Files]: 'Files',
    [Host.HR]: 'HR',
    [Host.Hub]: 'Hub',
    [Host.Security]: 'Security',
};

const TargetHost: React.FC
= () => {
    const { instructionId } = useInstructionContext('TargetScript');
    const { targetEntityId } = useParamSelector(selectInstruction, instructionId);

    assert(targetEntityId !== undefined, `Instruction '${instructionId}' does not have 'targetEntityId'.`);

    const host = targetEntityId as Host;
    assert(hosts.includes(host), `Instruction '${instructionId}' has a 'targetEntityId' (${targetEntityId}) which is not a Host.`);

    const name = hostName[host];

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => setDialogIsOpen(true);

    const handleDismiss: DismissDialogEventHandler
    = () => setDialogIsOpen(false);

    const dispatch = useAppDispatch();
    const handleSelect: SelectHostEventHandler
    = (host) => {
        dispatch(updateInstruction({
            id: instructionId,
            changes: { targetEntityId: host },
        }));
    };

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Text} onClick={handleClick}>
                <Name>{ name }</Name>
            </GlowButton>
            <HostSelectionDialog isOpen={dialogIsOpen} onDismiss={handleDismiss} onSelect={handleSelect} host={targetEntityId as Host} />
        </Container>
    );
};

const Container = styled.div`
    grid-area: host;

    display: grid;
    place-content: center;
`;

const Name = styled.div`
    width: calc(124px - 1rem);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

TargetHost.displayName = 'TargetHost';
export default TargetHost;
