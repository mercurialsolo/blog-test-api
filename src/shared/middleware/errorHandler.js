import { AppError } from '../errors/AppError.js';

/**
 * Global error handling middleware
 * Catches all errors and sends appropriate response
 */
export const errorHandler = (err, req, res, next) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let isOperational = err.isOperational || false;

  // Log error for debugging
  if (!isOperational) {
    console.error('Unexpected error:', err);
  }

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 handler for undefined routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404, true);
  next(error);
};
