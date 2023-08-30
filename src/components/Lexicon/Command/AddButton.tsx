import styled from 'styled-components';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddIcon } from '@/assets/add.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { selectDesign } from '@/features/commands';
import { addInstruction } from '@/features/instructions';
import { addInstructionToCurrentScript } from '@/features/scripts';
import { useAppDispatch, useParamSelector } from '@/hooks';

import { useCommandContext } from './CommandContext';

const AddButton: React.FC
= () => {
    const { commandId } = useCommandContext('AddButton');
    const design = useParamSelector(selectDesign, commandId);
    const { name } = design;

    const dispatch = useAppDispatch();
    const handleAddInstruction: React.MouseEventHandler<HTMLButtonElement> = () => {
        const instruction = design.createInstruction();
        dispatch(addInstruction(instruction));
        dispatch(addInstructionToCurrentScript(instruction.id));
    };

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Circle} onClick={handleAddInstruction}>
                <AddIcon />
                <VisuallyHidden>Add {name} Instruction to Script</VisuallyHidden>
            </GlowButton>
        </Container>
    );
};

const Container = styled.div`
    --color-highlight: var(--color-add);

    grid-area: add;

    display: grid;
    place-content: center;
`;

AddButton.displayName = 'AddButton';
export default AddButton;
