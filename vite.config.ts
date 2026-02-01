import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isLib = mode === 'lib';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: isLib
        ? {
            outDir: 'dist-lib',
            emptyOutDir: true,
            lib: {
              entry: path.resolve(__dirname, 'lib/index.ts'),
              name: 'MarkdownVisionPro',
              formats: ['es', 'cjs'],
              fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
            },
            rollupOptions: {
              external: ['react', 'react-dom', 'react/jsx-runtime'],
            },
          }
        : undefined,
    };
});
