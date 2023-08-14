import styled from 'styled-components';

import { GlyphPanelContent } from '@/components/GlyphPanel';
import { type CommandId } from '@/constants';
import designs from '@/game/designs';

import AddButton from './AddButton';
import { CommandProvider } from './CommandContext';
import CommandLevel from './CommandLevel';

declare type CommandContentProps = {
    commandId: CommandId;
};

const CommandContent: React.FC<CommandContentProps>
= ({ commandId }) => {
    const design = designs[commandId];
    const { name, canBeInstruction, shouldShowProgress } = design;

    return (
        <GlyphPanelContent commandId={commandId}>
            <CommandProvider commandId={commandId}>
                <PanelContent>
                    <Name>{ name }</Name>
                    { shouldShowProgress && <CommandLevel /> }
                    { canBeInstruction && <AddButton /> }
                </PanelContent>
            </CommandProvider>
        </GlyphPanelContent>
    );
};

const PanelContent = styled.div`
    display: grid;
    gap: 5px;
    grid-template-areas:
        'title add'
        'level add'
    ;
    grid-template-columns: 1fr 42px;
    grid-template-rows: 1rem 1fr;
    justify-content: start;
    min-height: 60px;
    padding: 8px 4px;
`;

const Name = styled.div`
    grid-area: title;
`;

CommandContent.displayName = 'CommandContent';
export default CommandContent;
