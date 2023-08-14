import styled from 'styled-components';

import { type CommandId } from '@/constants';
import GlyphPanel from '@/components/GlyphPanel';
import designs from '@/game/designs';

import CommandContent from './CommandContent';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const design = designs[commandId];
    const { subcommands } = design;

    return (
        <GlyphPanel>
            <CommandContent key={commandId} commandId={commandId} />
            { subcommands && <Separator /> }
            { subcommands && subcommands.map(subcommandId => <CommandContent key={subcommandId} commandId={subcommandId} />) }
        </GlyphPanel>
    );
};

const Separator = styled.div`
        height: 2px;
    background: var(--color-empty);
    margin-inline: 8px;
`;

Command.displayName = 'Command';
export default Command;
