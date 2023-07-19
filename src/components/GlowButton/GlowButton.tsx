import styled from 'styled-components';

import * as S from './GlowButton.styles';

export enum GlowButtonShape {
    Circle = 'circle',
    Rect = 'rect',
    Text = 'text',
}

const ButtonByShape: Record<GlowButtonShape, typeof S.ButtonBase> = {
    [GlowButtonShape.Circle]: styled(S.ButtonBase) ` ${S.circleShape} `,
    [GlowButtonShape.Rect]: styled(S.ButtonBase) ` ${S.rectShape} `,
    [GlowButtonShape.Text]: styled(S.ButtonBase) ` ${S.textShape} `,
};

const GlowByShape: Record<GlowButtonShape, typeof S.GlowBase> = {
    [GlowButtonShape.Circle]: styled(S.GlowBase) ` ${S.circleShape} `,
    [GlowButtonShape.Rect]: styled(S.GlowBase) ` ${S.rectShape} `,
    [GlowButtonShape.Text]: styled(S.GlowBase) ` ${S.textShape} `,
};

declare type GlowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    shape: GlowButtonShape;
};

const GlowButton: React.FC<GlowButtonProps>
= ({ shape, className, style, ...props }) => {
    const Button = ButtonByShape[shape];
    const Glow = GlowByShape[shape];

    return (
        <S.Container className={className} style={style}>
            <Button {...props} />
            <Glow />
        </S.Container>
    );
};

GlowButton.displayName = 'GlowButton';
export default GlowButton;
