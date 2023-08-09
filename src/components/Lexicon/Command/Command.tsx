import { type CommandId } from '@/constants';
import GlyphPanel from '@/components/GlyphPanel';
import designs from '@/game/designs';

import * as S from './Command.styles';
import AddButton from './AddButton';
import { CommandProvider } from './CommandContext';
import CommandLevel from './CommandLevel';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const design = designs[commandId];
    const { name } = design;

    return (
        <GlyphPanel commandId={commandId}>
            <CommandProvider commandId={commandId}>
                <S.PanelContent>
                    <S.Name>{name}</S.Name>
                    <CommandLevel />
                    <AddButton />
                </S.PanelContent>
            </CommandProvider>
        </GlyphPanel>
    );
};

export default Command;
