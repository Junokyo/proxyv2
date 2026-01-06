import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isFakeProxy = env.FAKE_PROXY === 'true';
  const host = env.HOST || 'https://proxy.forlike.pro';

  const fakeProxy = isFakeProxy
    ? {
        '/graphql': {
          target: host,
          rewrite: (path: string) => path.replace(/^\/graphql/, '/graphql/v1'), // Rewrite /graphql -> /graphql/v1
          changeOrigin: true,
          ws: true,
        },
      }
    : undefined;

  return {
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
      proxy: fakeProxy,
    },
    preview: {
      host: '::',
      port: 80,
      allowedHosts: env.ALLOWED_HOSTS?.split(',') || [
        'localhost',
        'proxy.forlike.pro',
      ],
    },
  };
});
