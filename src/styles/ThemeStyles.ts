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
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-text: var(--color-gray-1000);
            --color-highlight: var(--color-gray-900);
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
