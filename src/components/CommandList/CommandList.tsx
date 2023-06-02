import * as S from './CommandList.styles';

import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
import CommandId from '@/data/CommandId';

const commands: CommandId[] = [
    CommandId.Login,
    CommandId.Scan,
];

const CommandList: React.FC = () => {
    return (
        <S.Container>
            { commands.map(command => (
                <CommandButton key={command as string} command={command} glyphSize={GlyphSize.medium}>
                    <S.ButtonContent>
                        <S.Title>{command as string}</S.Title>
                    </S.ButtonContent>
                </CommandButton>
            )) }
        </S.Container>
    );
};

export default CommandList;
