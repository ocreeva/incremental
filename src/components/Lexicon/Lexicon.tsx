import { Commands } from '@/data';

import * as S from './Lexicon.styles';
import Command from './Command';

const commandIds = Commands.getAllCommandIds();

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
