import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig(({ mode }) => ({
    build: {
        outDir: './../dist',
        chunkSizeWarningLimit: 1000,
    },
    base: mode == 'development' ? '' : './',
    plugins: [
        vue(),
        nodePolyfills({
            include: ['fs']
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port: 3000,
    },
}));