import styled from 'styled-components';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as RemoveIcon } from '@/assets/remove.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { removeInstruction, selectInstruction } from '@/features/instructions';
import { removeInstructionFromCurrentScript } from '@/features/scripts';
import { useAppDispatch, useParamSelector } from '@/hooks';

import { useInstructionContext } from './InstructionContext';
import { selectCommandDesign } from '@/features/commandView';

const RemoveButton: React.FC
= () => {
    const { instructionId } = useInstructionContext('RemoveButton');
    const { commandId } = useParamSelector(selectInstruction, instructionId);
    const { name } = useParamSelector(selectCommandDesign, commandId);

    const dispatch = useAppDispatch();
    const handleRemoveInstruction: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(removeInstructionFromCurrentScript(instructionId));
        dispatch(removeInstruction(instructionId));
    };

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Circle} onClick={handleRemoveInstruction}>
                <RemoveIcon />
                <VisuallyHidden>Remove {name} Instruction from Script</VisuallyHidden>
            </GlowButton>
        </Container>
    );
};

const Container = styled.div`
    --color-highlight: var(--color-remove);

    grid-area: remove;

    display: grid;
    place-content: center;
`;

RemoveButton.displayName = 'RemoveButton';
export default RemoveButton;
