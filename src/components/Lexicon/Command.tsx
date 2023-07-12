import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddIcon } from '@/assets/add.svg';
import GlyphPanel from '@/components/GlyphPanel';
import { Commands } from '@/data';
import { addInstruction, createInstruction } from '@/features/instructions';
import { addInstructionToCurrentScript, selectCurrentScriptId } from '@/features/scripts';
import { useAppDispatch, useAppSelector } from '@/hooks';

import * as S from './Command.styles';

import type { CommandId } from '@/types';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const dispatch = useAppDispatch();
    const currentScriptId = useAppSelector(selectCurrentScriptId);

    const { name } = Commands.getCommandDesign(commandId);

    const handleAddCommand: React.MouseEventHandler<HTMLButtonElement> = () => {
        const instruction = createInstruction(commandId, currentScriptId);
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
                        <VisuallyHidden>Add '{name}' Command to Script</VisuallyHidden>
                    </S.AddButton>
                </S.AddContainer>
            </S.ButtonContent>
        </GlyphPanel>
    );
};

export default Command;
