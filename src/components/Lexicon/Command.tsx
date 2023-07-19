import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddIcon } from '@/assets/add.svg';
import { type CommandId } from '@/commands';
import commandDesigns from '@/commands/designs';
import GlyphPanel from '@/components/GlyphPanel';
import { addInstruction } from '@/features/instructions';
import { addInstructionToCurrentScript } from '@/features/scripts';
import { useAppDispatch } from '@/hooks';

import * as S from './Command.styles';

interface CommandProps {
    commandId: CommandId;
}

const Command: React.FC<CommandProps> = ({ commandId }) => {
    const dispatch = useAppDispatch();

    const design = commandDesigns[commandId];
    const { name } = design;

    const handleAddCommand: React.MouseEventHandler<HTMLButtonElement> = () => {
        const instruction = design.createInstruction();
        dispatch(addInstruction(instruction));
        dispatch(addInstructionToCurrentScript(instruction.id));
    };

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
