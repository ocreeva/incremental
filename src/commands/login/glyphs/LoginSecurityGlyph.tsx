import { useId } from 'react';

const LoginSecurityGlyph: React.FC
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

            {/* Security components (shield) */}
            <g clipPath={`url(#${id}_frame-clip)`}>
                <g transform="translate(-1) scale(0.72) translate(10)">
                    <path d="
                        M 0 -12 l 9.24 3.83 v 10.21 a 8 8 0 0 1 -4 6.93 l -5.24 3.03 l -5.24 -3.03 a 8 8 0 0 1 -4 -6.93 v -10.21 z
                        m 0 2.31 l -7.24 2.86 v 8.87 a 6 6 0 0 0 3 5.2 l 4.24 2.45 l 4.24 -2.45 a 6 6 0 0 0 3 -5.2 v -8.87" />
                    <g fillOpacity="0.25">
                        <path d="M 0 0 v -9.69 l 7.24 2.86 v 6.83" />
                        <path d="M 0 0 v 9.69 l -4.24 -2.45 a 6 6 0 0 1 -3 -5.2 v -2.04" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

LoginSecurityGlyph.displayName = 'LoginSecurityGlyph';
export default LoginSecurityGlyph;
