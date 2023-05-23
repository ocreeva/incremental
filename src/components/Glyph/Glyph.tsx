import { css } from 'styled-components';

import { useGlyph } from '@/hooks';

import ActionId from '@/model/ActionId';
import { CSSProperties } from 'react';

export enum GlyphSize {
    small = 30,  // 42px circle
    medium = 42, // 60px circle
    large = 51   // 72px circle
};

interface IGlyphProps {
    action: ActionId,
    size: GlyphSize,
}

const Glyph: React.FC<IGlyphProps> = ({ action, size }) => {
    const { GlyphComponent } = useGlyph(action as string);

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
