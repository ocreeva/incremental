import * as S from './GlyphPanel.styles';

declare type GlyphPanelProps = {
    shouldAnimate?: boolean;
};

const GlyphPanel: React.FC<React.PropsWithChildren<GlyphPanelProps>>
= ({ children, shouldAnimate = true }) => {
    const style = {
        '--glyph-panel_border-color': 'var(--color-highlight)',
    } as React.CSSProperties;

    const Container = shouldAnimate ? S.AnimatedContainer : S.Container;

    return (
        <Container style={style}>
            <S.Content>
                { children }
            </S.Content>
        </Container>
    );
};

export default GlyphPanel;
