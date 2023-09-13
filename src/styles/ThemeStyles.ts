import { css } from 'styled-components';

const ThemeStyles = css`
    :root {
        --hue-gray: 220deg;
        --color-gray-50: hsl(var(--hue-gray) 19% 10%);
        --color-gray-100: hsl(var(--hue-gray) 15% 20%);
        --color-gray-200: hsl(var(--hue-gray) 15% 25%);
        --color-gray-300: hsl(var(--hue-gray) 10% 40%);
        --color-gray-400: hsl(var(--hue-gray) 9% 45%);
        --color-gray-500: hsl(var(--hue-gray) 8% 50%);
        --color-gray-600: hsl(var(--hue-gray) 12% 55%);
        --color-gray-700: hsl(var(--hue-gray) 14% 66%);
        --color-gray-800: hsl(var(--hue-gray) 20% 77%);
        --color-gray-900: hsl(var(--hue-gray) 25% 88%);
        --color-gray-1000: hsl(var(--hue-gray) 25% 96%);

        --color-text: black;
        --color-highlight: gray;
        --color-background: white;
        --color-empty: lightgray;
        --color-progress: hsl(120deg 100% 25%);

        --color-dialog-ok: hsl(120deg 100% 25%);
        --color-dialog-cancel: hsl(0deg 100% 25%);

        --color-add: hsl(120deg 100% 25%);
        --color-minus: hsl(0deg 100% 25%);
        --color-plus: hsl(120deg 100% 25%);
        --color-remove: hsl(0deg 65% 35%);
        --color-star: hsl(55deg 100% 25%);

        --glyph_size-small: 0;
        --glyph_size-medium: 1;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-text: var(--color-gray-1000);
            --color-highlight: var(--color-gray-900);
            --color-empty: var(--color-gray-100);
            --color-background: var(--color-gray-50);
            --color-progress: hsl(120deg 100% 25%);

            --color-dialog-ok: hsl(120deg 100% 75%);
            --color-dialog-cancel: hsl(0deg 100% 75%);

            --color-add: hsl(120deg 100% 75%);
            --color-minus: hsl(0deg 100% 75%);
            --color-plus: hsl(120deg 100% 75%);
            --color-remove: hsl(0deg 65% 65%);
            --color-star: hsl(55deg 100% 75%);
        }
    }

    button:disabled, input:disabled {
        --color-add: currentColor;
        --color-minus: currentColor;
        --color-plus: currentColor;
        --color-star: currentColor;
    }

    body {
        background: var(--color-empty);
        color: var(--color-text);
    }
`;

export default ThemeStyles;
