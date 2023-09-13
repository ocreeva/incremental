import { useId } from 'react';

const LoginFilesGlyph: React.FC
= () => {
    const id = useId();

    return (
        <svg className="glyph" fill="currentColor" viewBox="-14 -14 28 28">
            <defs>
                <clipPath id={`${id}_frame-clip`}>
                    <path d="M -1 -7 a 2 2 0 0 1 2 -2 h 6 a 2 2 0 0 1 2 2 v 14 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2" />
                </clipPath>
            </defs>

            {/* Login components */}
            <g transform="translate(-2) rotate(120)">
                <path d="M 0 0 h 5 c 1 0 1 2 0 2 h -5" />
                <path transform="rotate(120)" d="M 0 0 h 5 c 1 0 1 -2 0 -2 h -5" />
            </g>
            <path d="M -3 -1 h -8 a 1 1 0 0 0 0 2 h 8" />
            <path fillOpacity="0.5" d="
                M -4 -7 a 5 5 0 0 1 5 -5 h 6 a 5 5 0 0 1 5 5 v 14 a 5 5 0 0 1 -5 5 h -6 a 5 5 0 0 1 -5 -5 a 1 1 0 0 1 2 0
                a 3 3 0 0 0 3 3 h 6 a 3 3 0 0 0 3 -3 v -14 a 3 3 0 0 0 -3 -3 h -6 a 3 3 0 0 0 -3 3 a 1 1 0 0 1 -2 0" />

            {/* Files components (folder) */}
            <g clipPath={`url(#${id}_frame-clip)`}>
                <g transform="translate(-1) scale(0.72) translate(12)">
                    <path d="
                            M -11 -7 a 2 2 0 0 1 2 -2 h 6 a 2 2 0 0 1 1 0.27 l 2 1.15 a 2 2 0 0 0 1 0.27 h 8 a 2 2 0 0 1 2 2 v 12.31 a 2 2 0 0 1 -2 2 h -18 a 2 2 0 0 1 -2 -2 z
                            m 3 0 a 1 1 0 0 0 -1 1 v 12 a 1 1 0 0 0 1 1 h 16 a 1 1 0 0 0 1 -1 v -10.31 a 1 1 0 0 0 -1 -1 h -8.31 a 2 2 0 0 1 -1 -0.27 l -2 -1.15 a 2 2 0 0 0 -1 -0.27" />
                    <path fillOpacity="0.5" d="
                        M 0 -5.31 a 2 2 0 0 0 -1 0.29 l -2 1.15 a 2 2 0 0 1 -1 0.29 h -5 v -1 h 4.5 a 2 2 0 0 0 1 -0.29 l 2 -1.15 a 2 2 0 0 0 1 -0.29" />
                </g>
            </g>
        </svg>
    );
};

LoginFilesGlyph.displayName = 'LoginFilesGlyph';
export default LoginFilesGlyph;
