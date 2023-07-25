import { CommandId } from '@/constants';

import * as S from './Lexicon.styles';
import Command from './Command';
import designs from '@/game/designs';

const commandIds = Object.values(CommandId);

const Lexicon: React.FC = () => {
    const availableCommandIds = commandIds.filter(commandId => designs[commandId].isInLexicon());

    return (
        <S.Container>
            { availableCommandIds.map(commandId => (
                <Command key={commandId as string} commandId={commandId} />
            )) }
        </S.Container>
    );
};

export default Lexicon;
