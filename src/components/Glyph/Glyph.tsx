import * as S from './Glyph.styles';

import { CommandId } from '@/types';
import { useGlyph } from '@/hooks';

export enum GlyphSize {
    small = 35,  // 42px circle
    medium = 50, // 60px circle
    large = 60   // 72px circle
};

interface GlyphProps {
    commandId: CommandId,
    size: GlyphSize,
}

const Glyph: React.FC<GlyphProps> = ({ commandId, size }) => {
    const { GlyphComponent } = useGlyph(commandId as string);

    return (
        <S.Container style={{ '--size': `${size as number}px`} as React.CSSProperties}>
            <GlyphComponent />
        </S.Container>
    );
};

export default Glyph;
