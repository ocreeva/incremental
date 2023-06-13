import { getAllCommandIds } from '@/data';

import * as S from './CommandList.styles';
import CommandListItem from './CommandListItem';

const commandIds = getAllCommandIds();

const CommandList: React.FC = () => {
    return (
        <S.Container>
            { commandIds.map(commandId => (
                <CommandListItem key={commandId as string} commandId={commandId} />
            )) }
        </S.Container>
    );
};

export default CommandList;
