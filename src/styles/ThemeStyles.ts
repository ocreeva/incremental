import { css } from 'styled-components';

const ThemeStyles = css`
    :root {
        --color-text: black;
        --color-primary: black;
        --color-highlight: black;
        --color-unknown1: grey;
        --color-unknown2: grey;
        --color-unknown3: grey;
        --color-background: white;
        --color-empty: white;

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
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-text: var(--color-gray-1000);
            --color-primary: hsl(0deg 0% 100%);
            --color-highlight: hsl(183deg 91% 50%);
            --color-unknown1: hsl(198deg 100% 43%);
            --color-unknown2: hsl(212deg 68% 36%);
            --color-unknown3: hsl(221deg 51% 25%);
            --color-empty: var(--color-gray-100);
            --color-background: var(--color-gray-50);
        }
    }

    body {
        background: var(--color-empty);
        color: var(--color-text);
    }
`;

export default ThemeStyles;
