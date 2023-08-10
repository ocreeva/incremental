import { type CommandId } from '@/constants';
import designs from '@/game/designs';
import { useGlyph } from '@/hooks';

import * as S from './GlyphPanel.styles';

declare type GlyphPanelProps = {
    commandId: CommandId;
    shouldAnimate?: boolean;
};

const GlyphPanel: React.FC<React.PropsWithChildren<GlyphPanelProps>> = ({ children, commandId, shouldAnimate = true }) => {
    const { glyphPath } = designs[commandId];
    const { GlyphComponent } = useGlyph(glyphPath);

    const commandButtonStyles = {
        '--glyph-panel_border-color': 'var(--color-highlight)',
    } as React.CSSProperties;

    const Container = shouldAnimate ? S.AnimatedContainer : S.Container;

    return (
        <Container style={commandButtonStyles}>
            <S.GlyphPanel>
                <S.GlyphContainer>
                    <GlyphComponent className='glyph' />
                </S.GlyphContainer>
                <S.ContentContainer>
                    { children }
                </S.ContentContainer>
            </S.GlyphPanel>
        </Container>
    );
};

export default GlyphPanel;
