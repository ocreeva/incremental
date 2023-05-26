import styled from 'styled-components';

import Glyph, { GlyphSize } from '@/components/Glyph';
import CommandId from '@/data/CommandId';
import { addInstructionToProgram } from '@/features/program';
import { useAppDispatch } from '@/hooks';

interface CommandListItemProps {
    command: CommandId;
}

const CommandListItem: React.FC<CommandListItemProps> = ({ command }) => {
    const dispatch = useAppDispatch();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(addInstructionToProgram({ command }));
    }

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
    border-inline-end: 0;
    border-radius: 15px 0 0 15px;
    padding: 0;
    padding-inline-end: 8px;

    display: grid;
    gap: 4px;
    grid-template-columns: 56px 1fr;
    grid-template-areas:
        'glyph title'
        'glyph progress'
        'glyph other'
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

export default CommandListItem;
