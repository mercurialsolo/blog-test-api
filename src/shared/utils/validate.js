import { ValidationError } from '../errors/AppError.js';

export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    const fieldList = missingFields.join(', ');
    throw new ValidationError('Missing required fields: ' + fieldList);
  }
};

export const validateString = (value, fieldName) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new ValidationError(fieldName + ' must be a non-empty string');
  }
};
