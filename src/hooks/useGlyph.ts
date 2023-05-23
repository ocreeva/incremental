import { useEffect, useRef, useState } from "react";

import { importGlyph } from '@/assets';
import { ReactComponent as EmptyGlyph } from '@/assets/empty.svg';
import { ReactComponent as ErrorGlyph } from '@/assets/error.svg';

const useGlyph = (path: string) => {
    const GlyphComponentRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>(EmptyGlyph);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        const loadSvg = async (): Promise<void> => {
            setIsLoading(true);
            try {
                GlyphComponentRef.current = await importGlyph(path);
            }
            catch (err) {
                setError(err);
                console.error(err);
                GlyphComponentRef.current = ErrorGlyph;
            }
            finally {
                setIsLoading(false);
            }
        };

        loadSvg();
    }, [path]);

    return { error, isLoading, GlyphComponent: GlyphComponentRef.current };
};

export default useGlyph;
