import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    host: '::',
    port: 8080,
    proxy: {
      '/graphql': {
        target: 'https://proxy.forlike.pro',
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql/v1'), // Rewrite /graphql -> /graphql/v1
        changeOrigin: true,
      },
    },
  },

  preview: {
    host: '::',
    port: 80,
    allowedHosts: process.env.ALLOWED_HOSTS?.split(',') || [
      'localhost',
      'proxy.forlike.pro',
    ],
  },
});
