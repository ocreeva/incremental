import styled from 'styled-components';

import Glyph, { GlyphSize } from '@/components/Glyph/Glyph';
import { ProgramInstruction, removeInstructionFromProgram } from '@/features/program';
import { useAppDispatch } from '@/hooks';

interface InstructionListItemProps {
    instruction: ProgramInstruction;
}

const InstructionListItem: React.FC<InstructionListItemProps> = ({ instruction }) => {
    const dispatch = useAppDispatch();

    const { id, command } = instruction;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(removeInstructionFromProgram({ id }));
    };

    return (
        <Container onClick={handleClick}>
            <Glyph command={command} size={GlyphSize.medium} />
        </Container>
    );
};

const Container = styled.button`
    height: 60px;
    width: 60px;

    background: none;
    border: 2px solid black;
    border-inline-start: 0;
    border-radius: 0 15px 15px 0;
    margin-inline-start: -4px;

    display: grid;
    place-content: center;
`;

export default InstructionListItem;
