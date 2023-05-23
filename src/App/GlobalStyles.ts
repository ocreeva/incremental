import { createGlobalStyle } from 'styled-components';

import { GlyphGlobalStyle } from '@/components/Glyph';

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
html, body {
    height: 100%;
}

/*  Typography tweaks for accessibility and text rendering.  */
body {
    line-height: 1.5;
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
body > main {
    isolation: isolate;
}

#root {
    isolation: isolate;
}

${GlyphGlobalStyle};
`;

export default GlobalStyles;
