import { describe, it, expect } from '@jest/globals';
import { validateRequiredFields, validateString } from '../../src/shared/utils/validate.js';
import { ValidationError } from '../../src/shared/errors/AppError.js';

describe('Validation utilities', () => {
  describe('validateRequiredFields', () => {
    it('should not throw when all required fields are present', () => {
      const data = { name: 'John', age: 30 };
      expect(() => validateRequiredFields(data, ['name', 'age'])).not.toThrow();
    });

    it('should throw ValidationError when required field is missing', () => {
      const data = { name: 'John' };
      expect(() => validateRequiredFields(data, ['name', 'age'])).toThrow(
        ValidationError
      );
    });

    it('should include missing field names in error message', () => {
      const data = { name: 'John' };
      expect(() => validateRequiredFields(data, ['name', 'age', 'email'])).toThrow(
        /age.*email/
      );
    });
  });

  describe('validateString', () => {
    it('should not throw for valid non-empty string', () => {
      expect(() => validateString('test', 'field')).not.toThrow();
    });

    it('should throw for non-string value', () => {
      expect(() => validateString(123, 'field')).toThrow(ValidationError);
    });

    it('should throw for empty string', () => {
      expect(() => validateString('', 'field')).toThrow(ValidationError);
    });

    it('should throw for whitespace-only string', () => {
      expect(() => validateString('   ', 'field')).toThrow(ValidationError);
    });
  });
});
