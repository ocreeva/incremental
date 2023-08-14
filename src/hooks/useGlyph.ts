import { useEffect, useRef, useState } from "react";

import { importGlyph } from '@/assets';
import { ReactComponent as EmptyGlyph } from '@/assets/glyphs/empty.svg';
import { ReactComponent as ErrorGlyph } from '@/assets/glyphs/error.svg';

declare type GlyphLookup = {
    [path: string]: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
};
const glyphByPath: GlyphLookup = { };

const useGlyph = (path: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        if (glyphByPath[path] !== undefined) return;

        const loadSvg = async (): Promise<void> => {
            setIsLoading(true);
            try {
                glyphByPath[path] = await importGlyph(path);
            }
            catch (err) {
                setError(err);
                console.error(err);
                glyphByPath[path] = ErrorGlyph;
            }
            finally {
                setIsLoading(false);
            }
        };

        loadSvg();
    }, [path]);

    return { error, isLoading, GlyphComponent: glyphByPath[path] || EmptyGlyph };
};

export default useGlyph;
