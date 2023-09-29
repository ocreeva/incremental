import { Accordion } from '@reach/accordion';

import { CommandId } from '@/constants';
import { selectCountOfAvailableCommands } from '@/features/commandDesign';
import { useAppSelector } from '@/hooks';

import * as S from './Lexicon.styles';
import Command from './Command';

const commandIds = Object.values(CommandId);

const Lexicon: React.FC = () => {
    const numberOfAvailableCommands = useAppSelector(selectCountOfAvailableCommands);
    const style = {
        '--lexicon_num-commands': `${numberOfAvailableCommands}`,
    } as React.CSSProperties;

    return (
        <>
            <S.Spacer style={style} />
            <S.Container>
                <Accordion id='lexicon'>
                    { commandIds.map(commandId => (
                        <Command key={commandId as string} commandId={commandId} />
                    )) }
                </Accordion>
            </S.Container>
            <S.Spacer style={style} />
        </>
    );
};

export default Lexicon;
