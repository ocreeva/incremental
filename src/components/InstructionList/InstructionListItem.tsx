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
        console.log('remove instruction');
        dispatch(removeInstructionFromProgram({ id }));
    };

    return (
        <Container onClick={handleClick}>
            <GlyphContainer>
                <Glyph command={command} size={GlyphSize.medium} />
            </GlyphContainer>
            <Title>{command as string}</Title>
        </Container>
    );
};

const Container = styled.button`
    height: 60px;
    width: 100%;

    background: none;
    border: 2px solid black;
    border-inline-start: 0;
    border-radius: 0 15px 15px 0;
    padding: 0;
    padding-inline-start: 8px;

    display: grid;
    gap: 4px;
    grid-template-columns: 1fr 56px;
    grid-template-areas:
        'title glyph'
        'progress glyph'
        'other glyph'
    ;
    place-content: center;
`;

const GlyphContainer = styled.div`
    grid-area: glyph;

    display: grid;
    place-content: center;
`;

const Title = styled.div`
    grid-area: title;
    justify-self: start;

    font-size: 1.25rem;
    font-weight: 600;
`;

export default InstructionListItem;
