import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
import { addInstruction, createInstruction } from '@/features/instructions';
import { addInstructionToCurrentScript } from '@/features/scripts';
import { Commands } from '@/data';
import { useAppDispatch } from '@/hooks';

import * as S from './CommandListItem.styles';

import type { CommandId } from '@/types';

interface CommandListItemProps {
    commandId: CommandId;
}

const CommandListItem: React.FC<CommandListItemProps> = ({ commandId }) => {
    const dispatch = useAppDispatch();

    const { name } = Commands.getCommandDesign(commandId);

    const handleAddCommand: React.MouseEventHandler<HTMLButtonElement> = () => {
        const instruction = createInstruction(commandId);
        dispatch(addInstruction(instruction));
        dispatch(addInstructionToCurrentScript(instruction.id));
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
