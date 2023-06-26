import GlyphPanel from '@/components/GlyphPanel';
import { addInstruction, createInstruction } from '@/features/instructions';
import { addInstructionToCurrentScript } from '@/features/scripts';
import { Commands } from '@/data';
import { useAppDispatch } from '@/hooks';

import * as S from './Command.styles';
import { ReactComponent as AddIcon } from '@/assets/add.svg';

import type { CommandId } from '@/types';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const dispatch = useAppDispatch();

    const { name } = Commands.getCommandDesign(commandId);

    const handleAddCommand: React.MouseEventHandler<HTMLButtonElement> = () => {
        const instruction = createInstruction(commandId);
        dispatch(addInstruction(instruction));
        dispatch(addInstructionToCurrentScript(instruction.id));
    }

    return (
        <GlyphPanel commandId={commandId}>
            <S.ButtonContent>
                <S.Name>{name}</S.Name>
                <S.AddContainer>
                    <S.AddButton onClick={handleAddCommand}>
                        <AddIcon className='glyph' />
                    </S.AddButton>
                </S.AddContainer>
            </S.ButtonContent>
        </GlyphPanel>
    );
};

export default Command;
