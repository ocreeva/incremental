import { useId } from 'react';

const LoginHRGlyph: React.FC
= () => {
    const id = useId();

    return (
        <svg className="glyph" fill="currentColor" viewBox="-14 -14 28 28">
            <defs>
                <clipPath id={`${id}_frame-clip`}>
                    <path d="M -1 -7 a 2 2 0 0 1 2 -2 h 6 a 2 2 0 0 1 2 2 v 14 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2" />
                </clipPath>

                <clipPath id={`${id}_meeple-clip-body`}>
                    <path d="
                        M -24 -24 v 48 h 48 v -48 z
                        M -11 12 a 2 2 0 0 1 -2 -2 v -2 a 8 7 0 0 1 16 0 v 2 a 2 2 0 0 1 -2 2" />
                </clipPath>
                <clipPath id={`${id}_meeple-clip`} clip-path={`url(#${id}_meeple-clip-body)`}>
                    <path d="
                        M -24 -24 v 48 h 48 v -48 z
                        M -5 2 a 5 5 0 0 1 0 -10 a 5 5 0 0 1 0 10" />
                </clipPath>
            </defs>

            {/* Login components */}
            <g transform="translate(-2) rotate(120)">
                <path d="M 0 0 h 5 c 1 0 1 2 0 2 h -5" />
                <path transform="rotate(120)" d="M 0 0 h 5 c 1 0 1 -2 0 -2 h -5" />
            </g>
            <path d="M -3 -1 h -8 a 1 1 0 0 0 0 2 h 8" />
            <path fill-opacity="0.5" d="
                M -4 -7 a 5 5 0 0 1 5 -5 h 6 a 5 5 0 0 1 5 5 v 14 a 5 5 0 0 1 -5 5 h -6 a 5 5 0 0 1 -5 -5 a 1 1 0 0 1 2 0
                a 3 3 0 0 0 3 3 h 6 a 3 3 0 0 0 3 -3 v -14 a 3 3 0 0 0 -3 -3 h -6 a 3 3 0 0 0 -3 3 a 1 1 0 0 1 -2 0" />

            {/* HR components (meeples) */}
            <g clip-path={`url(#${id}_frame-clip)`}>
                <g transform="translate(-1) scale(0.72) translate(12 -1)">
                    <g id={`${id}_meeple`}>
                        <path d="
                            M -5 1 a 4 4 0 0 1 0 -8 a 4 4 0 0 1 0 8
                            m 0 -2 a 2 2 0 0 0 0 -4 a 2 2 0 0 0 0 4" />
                        <path d="
                            M -11 11 a 1 1 0 0 1 -1 -1 v -2 a 7 6 0 0 1 14 0 v 2 a 1 1 0 0 1 -1 1 z
                            M -0.5 9 a 0.5 0.5 0 0 0 0.5 -0.5 v -0.5 a 5 4 0 0 0 -10 0 v 0.5 a 0.5 0.5 0 0 0 0.5 0.5" />
                        <g fill-opacity="0.25">
                            <path d="M -5 -1 a 2 2 0 0 1 0 -4 a 2 2 0 0 1 0 4" />
                            <path d="M -0.5 9 a 0.5 0.5 0 0 0 0.5 -0.5 v -0.5 a 5 4 0 0 0 -10 0 v 0.5 a 0.5 0.5 0 0 0 0.5 0.5" />
                        </g>
                    </g>
                    <g id={`${id}_meeple-offset`} clip-path={`url(#${id}_meeple-clip)`}>
                        <use href={`#${id}_meeple`} transform="translate(5 -2)" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

LoginHRGlyph.displayName = 'LoginHRGlyph';
export default LoginHRGlyph;
