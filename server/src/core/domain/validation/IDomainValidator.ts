import { ValidationResult } from './ValidationResult';
import { ValidationContext } from './ValidationContext';
import { ValidationOptions } from './ValidationOptions';

export interface IDomainValidator<T> {
  validate(target: T, context?: ValidationContext, options?: ValidationOptions): ValidationResult;
  validateAsync(target: T, context?: ValidationContext, options?: ValidationOptions): Promise<ValidationResult>;
}
