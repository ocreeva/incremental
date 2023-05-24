import styled from 'styled-components';

import CommandId from '@/data/CommandId';
import CommandListItem from './CommandListItem';

const commands: CommandId[] = [
    CommandId.Login,
    CommandId.Test,
];

const CommandList: React.FC = () => {
    return (
        <Container>
            { commands.map(command => (
                <CommandListItem key={command as string} command={command} />
            )) }
        </Container>
    );
};

const Container = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export default CommandList;
