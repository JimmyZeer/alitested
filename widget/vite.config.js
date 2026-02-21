import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react()
    ],
    build: {
        outDir: '../assets/widget',
        emptyOutDir: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.jsx'),
            output: {
                entryFileNames: 'suitcase-selector.js',
                chunkFileNames: 'suitcase-selector-[hash].js',
                assetFileNames: 'suitcase-selector.[ext]'
            }
        }
    }
});
