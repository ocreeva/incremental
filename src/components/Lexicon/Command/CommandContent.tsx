import styled from 'styled-components';

import { GlyphPanelContent } from '@/components/GlyphPanel';
import { type CommandId } from '@/constants';
import { selectCommandDesign } from '@/features/commandDesign';
import { useParamSelector } from '@/hooks';

import AddButton from './AddButton';
import { CommandProvider } from './CommandContext';
import CommandLevel from './CommandLevel';
import ExpandButton from './ExpandButton';

declare type CommandContentProps = {
    commandId: CommandId;
};

const CommandContent: React.FC<CommandContentProps>
= ({ commandId }) => {
    const design = useParamSelector(selectCommandDesign, commandId);
    const { name, canBeInstruction, isVisible, shouldShowLevel, subcommands } = design;

    if (!isVisible) return null;

    const ContentContainer = subcommands ? canBeInstruction
        ? PanelWithExpandAndAdd
        : PanelWithExpand
        : PanelContent;

    return (
        <GlyphPanelContent commandId={commandId}>
            <CommandProvider commandId={commandId}>
                <ContentContainer>
                    <Name>{ name }</Name>
                    { shouldShowLevel && <CommandLevel /> }
                    { subcommands && <ExpandButton /> }
                    { canBeInstruction && <AddButton /> }
                </ContentContainer>
            </CommandProvider>
        </GlyphPanelContent>
    );
};

const PanelContent = styled.div`
    display: grid;
    gap: 5px;
    grid-template-areas:
        'name add'
        'level add'
    ;
    grid-template-columns: 1fr 42px;
    grid-template-rows: 1rem 1fr;
    justify-content: start;
    min-height: 60px;
    padding: 8px 4px;
`;

const PanelWithExpand = styled(PanelContent)`
    grid-template-areas:
        'name expand'
        'level expand'
    ;
`;

const PanelWithExpandAndAdd = styled(PanelContent)`
    grid-template-areas:
        'name expand add'
        'level expand add'
    ;
    grid-template-columns: 1fr 42px 42px;
`;

const Name = styled.div`
    grid-area: name;
`;

CommandContent.displayName = 'CommandContent';
export default CommandContent;
