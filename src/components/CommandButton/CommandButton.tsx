import * as S from './CommandButton.styles';

import Glyph, { GlyphSize } from '@/components/Glyph';
import CommandId from '@/data/CommandId';

interface CommandButtonProps {
    command: CommandId;
    glyphSize: GlyphSize;
}

const buttonSizeByGlyphSize = {
    [GlyphSize.small]: '42px',
    [GlyphSize.medium]: '60px',
    [GlyphSize.large]: '72px',
};

const CommandButton: React.FC<React.PropsWithChildren<CommandButtonProps>> = ({ children, command, glyphSize }) => {
    const commandButtonStyles = {
        '--command-button_border-color': 'var(--color-highlight)',
        '--command-button_glyph-size': buttonSizeByGlyphSize[glyphSize],
    } as React.CSSProperties;

    return (
        <S.Container style={commandButtonStyles}>
            <S.CommandButton>
                <Glyph command={command} size={glyphSize} />
                <S.ContentContainer>
                    { children }
                </S.ContentContainer>
            </S.CommandButton>
        </S.Container>
    );
};

export default CommandButton;
