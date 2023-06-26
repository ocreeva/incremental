import { createGlobalStyle } from 'styled-components';

import FontStyles from './FontStyles';
import ThemeStyles from './ThemeStyles';

const GlobalStyles = createGlobalStyle`
/*  Use a more intuitive box-sizing model.  */
*, *::before, *::after {
    box-sizing: border-box;
}

/*  Remove default margins.  */
* {
    margin: 0;
}

/*  Enable percentage-based heights.  */
html, body, #root {
    height: 100%;
}

/*  Typography tweaks for accessibility and text rendering.  */
body {
    line-height: 1.2;
    -webkit-font-smoothing: antialiased;
}

/*  Alter default media behavior.  */
img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
}

/*  Remove form element typographic overrides.  */
input, button, textarea, select {
    font: inherit;
}

/*  Avoid text overflow.  */
p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
}

/*  Create a root stacking context.  */
#root {
    isolation: isolate;
}

/*  Reset default button styling.  */
button {
    background: transparent;
    border: 0;
    color: inherit;
    padding: 0;
}

/*  Default glyph sizing through CSS variables.  */
svg.glyph {
    height: calc(34px + 16px * var(--glyph_size, 0));
    width: calc(34px + 16px * var(--glyph_size, 0));
}

${FontStyles}
${ThemeStyles}
`;

export default GlobalStyles;
