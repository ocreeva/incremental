import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
import { getCommand } from '@/data';
import { CommandId } from '@/types';

import * as S from './CommandListItem.styles';

interface CommandListItemProps {
    commandId: CommandId;
}

const CommandListItem: React.FC<CommandListItemProps> = ({ commandId }) => {
    const { name } = getCommand(commandId);

    return (
        <CommandButton commandId={commandId} glyphSize={GlyphSize.medium}>
            <S.ButtonContent>
                <S.Name>{name}</S.Name>
            </S.ButtonContent>
        </CommandButton>
    );
};

export default CommandListItem;
