import { DomainException } from '../exceptions/DomainException';
import { ValidationResult } from './ValidationResult';

export class ValidationException extends DomainException {
  public readonly validationResult: ValidationResult;

  constructor(message: string, validationResult: ValidationResult, metadata?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', metadata);
    this.validationResult = validationResult;
    this.name = this.constructor.name;
  }
}
