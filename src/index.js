import express from 'express';
import config from './config/index.js';
import { createPostRoutes } from './features/posts/postRoutes.js';
import { errorHandler, notFoundHandler } from './shared/middleware/errorHandler.js';

/**
 * Creates and configures the Express application
 */
export const createApp = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use(`${config.api.prefix}/posts`, createPostRoutes());

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

// Start server only if this is the main module
const app = createApp();

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.env} mode`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

export default app;
