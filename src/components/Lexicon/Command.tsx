import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddIcon } from '@/assets/add.svg';
import { type CommandId } from '@/commands';
import commandDesigns from '@/commands/designs';
import GlyphPanel from '@/components/GlyphPanel';
import { addInstruction, createInstruction } from '@/features/instructions';
import { addInstructionToCurrentScript, selectCurrentScriptId } from '@/features/scripts';
import { useAppDispatch, useAppSelector } from '@/hooks';

import * as S from './Command.styles';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const dispatch = useAppDispatch();
    const currentScriptId = useAppSelector(selectCurrentScriptId);

    const { name } = commandDesigns[commandId];

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
