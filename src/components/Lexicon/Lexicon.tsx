import { CommandId } from '@/constants';

import * as S from './Lexicon.styles';
import Command from './Command';

const commandIds = Object.values(CommandId);

const Lexicon: React.FC = () => {
    return (
        <S.Container>
            { commandIds.map(commandId => (
                <Command key={commandId as string} commandId={commandId} />
            )) }
        </S.Container>
    );
};

export default Lexicon;
