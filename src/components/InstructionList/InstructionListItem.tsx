import styled from 'styled-components';
import { ReactComponent as RemoveIcon } from '@/assets/remove.svg';

import Glyph, { GlyphSize } from '@/components/Glyph/Glyph';
import { ProgramInstruction, removeInstructionFromProgram } from '@/features/program';
import { useAppDispatch } from '@/hooks';

interface InstructionListItemProps {
    instruction: ProgramInstruction;
}

const InstructionListItem: React.FC<InstructionListItemProps> = ({ instruction }) => {
    const dispatch = useAppDispatch();

    const { id, command } = instruction;

    const handleRemoveInstruction: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(removeInstructionFromProgram({ id }));
    };

    return (
        <Container>
            <Glyph command={command} size={GlyphSize.medium} />
            <Title>{command as string}</Title>
            <ControlsContainer>
                <RemoveInstruction onClick={handleRemoveInstruction}>
                    <RemoveIcon className='glyph' />
                </RemoveInstruction>
            </ControlsContainer>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    gap: 4px;
    grid-template-areas:
        'title glyph'
        'controls glyph'
    ;
    grid-template-columns: 1fr 56px;
    grid-template-rows: 1fr 28px;

    height: calc(1.2rem + 40px);
    min-height: 60px;
    padding-inline-start: 4px;
    width: 100%;

    border: 2px solid black;
    border-inline-start: 0;
    border-radius: 0 15px 15px 0;
`;

const Title = styled.div`
    grid-area: title;
    place-self: end;

    font-size: 1.125rem;
    font-weight: 500;
`;

const ControlsContainer = styled.div`
    grid-area: controls;
    --size: 20px;

    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const RemoveInstruction = styled.button`
    margin-inline-end: auto;

    height: 24px;
    padding: 0;
    width: 24px;

    background: transparent;
    border: 1px solid black;
    border-radius: 25%;

    display: grid;
    place-content: center;
`;

export default InstructionListItem;
