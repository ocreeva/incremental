import { css } from 'styled-components';

import { useGlyph } from '@/hooks';

import CommandId from '@/data/CommandId';
import { CSSProperties } from 'react';

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
        <>
            <GlyphComponent className='glyph' style={{ '--size': `${size as number}px` } as CSSProperties} />
        </>
    );
};

export const GlyphGlobalStyle = css`
    svg.glyph {
        height: var(--size);
        width: var(--size);
    }
`;

export default Glyph;
