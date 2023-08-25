import styled, { keyframes } from 'styled-components';
import { AccordionItem, AccordionPanel } from '@reach/accordion';

import commands from '@/commands/designs';
import GlyphPanel from '@/components/GlyphPanel';
import { type CommandId } from '@/constants';

import CommandContent from './CommandContent';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const design = commands[commandId];
    const { subcommands } = design;

    return (
        <GlyphPanel>
            <AccordionItem id={commandId as string}>
                <CommandContent key={commandId} commandId={commandId} />
                <Subcommands>
                    <Separator />
                    { subcommands && subcommands.map(subcommandId => <CommandContent key={subcommandId} commandId={subcommandId} />) }
                </Subcommands>
            </AccordionItem>
        </GlyphPanel>
    );
};

const Separator = styled.div`
    height: 2px;
    background: var(--color-empty);
    margin-inline: 8px;
`;

const slideDown = keyframes`
    from { max-height: 0vh; }
    to { max-height: 80vh; }
`;

const Subcommands = styled(AccordionPanel)`
    overflow: hidden;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${slideDown} 1000ms;
    }
`;

Command.displayName = 'Command';
export default Command;
