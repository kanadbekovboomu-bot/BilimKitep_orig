/**
 * Unified Production Server for Render.com (and Railway / Heroku / VPS)
 * - Serves production React build (SPA routing fallback to index.html)
 * - Runs the Telegram Bot daemon (@BilimKitep_bot) in the background
 * - Built-in health check endpoint (/healthz)
 * - Zero external dependencies (uses Node.js built-in http, fs, path)
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');

// MIME types dictionary for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  // 1. Health check for Render / load balancers
  if (req.url === '/healthz' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }));
    return;
  }

  // Normalize URL and remove query strings
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Security: prevent directory traversal
  let safePath = path.normalize(path.join(DIST_DIR, pathname));
  if (!safePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(safePath, (err, stats) => {
    if (!err && stats.isFile()) {
      // Serve static file
      const ext = path.extname(safePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // Immutable cache for hashed assets, no-cache for index.html
      const headers = { 'Content-Type': contentType };
      if (ext === '.html') {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      } else {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      }

      res.writeHead(200, headers);
      fs.createReadStream(safePath).pipe(res);
    } else {
      // SPA Fallback: serve dist/index.html for any frontend client route
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error: dist/index.html not found. Run npm run build first.');
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          });
          res.end(content);
        }
      });
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [BilimKitep Server] Онлайн на порту ${PORT}`);
  console.log(`📂 [Static Directory] ${DIST_DIR}`);

  // Launch Telegram Bot in the background
  try {
    const botScript = path.resolve(__dirname, 'scripts', 'telegramBot.js');
    if (fs.existsSync(botScript)) {
      console.log('🤖 [Telegram Bot] Запуск фонового процесса бота...');
      const botProcess = spawn('node', [botScript], {
        stdio: 'inherit',
        env: { ...process.env },
      });

      botProcess.on('error', (botErr) => {
        console.warn('⚠️ [Telegram Bot] Ошибка запуска бота:', botErr.message);
      });

      botProcess.on('exit', (code) => {
        console.log(`ℹ️ [Telegram Bot] Процесс бота завершился с кодом ${code}`);
      });
    }
  } catch (err) {
    console.warn('⚠️ [Telegram Bot] Не удалось запустить бота:', err.message);
  }
});
