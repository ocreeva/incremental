import { Accordion } from '@reach/accordion';

import commands from '@/commands/designs';
import { CommandId } from '@/constants';

import * as S from './Lexicon.styles';
import Command from './Command';

const commandIds = Object.values(CommandId);

const Lexicon: React.FC = () => {
    const availableCommandIds = commandIds.filter(commandId => commands[commandId].isInLexicon());
    const style = {
        '--lexicon_num-commands': `${availableCommandIds.length}`,
    } as React.CSSProperties;

    return (
        <>
            <S.Spacer style={style} />
            <S.Container>
                <Accordion id='lexicon'>
                    { availableCommandIds.map(commandId => (
                        <Command key={commandId as string} commandId={commandId} />
                    )) }
                </Accordion>
            </S.Container>
            <S.Spacer style={style} />
        </>
    );
};

export default Lexicon;
