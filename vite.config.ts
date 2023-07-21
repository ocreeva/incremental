import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            plugins: [
                [ "@swc/plugin-styled-components", {} ]
            ]
        }),
        svgr()
    ],
    resolve: {
        alias: [
            { find: '@reach', replacement: path.resolve(__dirname, 'reach') },
            { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
    },
});
