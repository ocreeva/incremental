import * as S from './Glyph.styles';

import CommandId from '@/data/CommandId';
import { useGlyph } from '@/hooks';

export enum GlyphSize {
    small = 35,  // 42px circle
    medium = 50, // 60px circle
    large = 60   // 72px circle
};

interface GlyphProps {
    command: CommandId,
    size: GlyphSize,
}

const Glyph: React.FC<GlyphProps> = ({ command, size }) => {
    const { GlyphComponent } = useGlyph(command as string);

    return (
        <S.Container style={{ '--size': `${size as number}px`} as React.CSSProperties}>
            <GlyphComponent />
        </S.Container>
    );
};

export default Glyph;
