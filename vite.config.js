import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function restApiPlugin() {
  return {
    name: 'bilimkitep-rest-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api')) return next();
        try {
          const { handleRestApi } = await server.ssrLoadModule('/src/server/apiRouter.js');
          return handleRestApi(req, res);
        } catch (err) {
          console.error('[API Middleware Error]:', err);
          return next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api')) return next();
        try {
          const { handleRestApi } = await server.ssrLoadModule('/src/server/apiRouter.js');
          return handleRestApi(req, res);
        } catch (err) {
          return next();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dbUrl = env.VITE_DATABASE_URL || env.DATABASE_URL || '';

  return {
    plugins: [react(), restApiPlugin()],
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
