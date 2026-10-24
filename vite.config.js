import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dbUrl = env.VITE_DATABASE_URL || env.DATABASE_URL || '';

  return {
    plugins: [react()],
    define: {
      'process.env.DATABASE_URL': JSON.stringify(dbUrl),
      'process.env.DATABASE_URL_UNPOOLED': JSON.stringify(env.DATABASE_URL_UNPOOLED || dbUrl),
      'process.env.NEON_BRANCH': JSON.stringify(env.NEON_BRANCH || 'production'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  };
});
