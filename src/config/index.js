/**
 * Application configuration
 * Single source of truth for all config values
 */
export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  api: {
    prefix: '/api/v1',
    timeout: 30000,
  },
  database: {
    // Placeholder for database config
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
  },
};

export default config;
