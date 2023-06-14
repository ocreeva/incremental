import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
import { getCommand } from '@/data';
import { useAppDispatch } from '@/hooks';
import { CommandId } from '@/types';

import * as S from './CommandListItem.styles';
import { addInstruction } from '@/features/program';

interface CommandListItemProps {
    commandId: CommandId;
}

const CommandListItem: React.FC<CommandListItemProps> = ({ commandId }) => {
    const dispatch = useAppDispatch();

    const { name } = getCommand(commandId);

    const handleAddCommand: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(addInstruction({ commandId }));
    }

    return (
        <CommandButton commandId={commandId} glyphSize={GlyphSize.medium}>
            <S.ButtonContent>
                <S.Name>{name}</S.Name>
                <S.AddContainer>
                    <S.AddButton onClick={handleAddCommand}>
                        <S.AddIcon />
                    </S.AddButton>
                </S.AddContainer>
            </S.ButtonContent>
        </CommandButton>
    );
};

export default CommandListItem;
