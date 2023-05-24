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
            <Glyph command={command} size={GlyphSize.medium} />
        </Container>
    );
};

const Container = styled.button`
    height: 60px;
    width: 60px;

    background: none;
    border: 2px solid black;
    border-inline-end: 0;
    border-radius: 15px 0 0 15px;
    margin-inline-end: -4px;

    display: grid;
    place-content: center;
`;

export default CommandListItem;
