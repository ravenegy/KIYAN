import { ValidationResult } from './ValidationResult';
import { ValidationContext } from './ValidationContext';

export interface ValidationRule<T> {
  readonly priority: number;
  readonly enabled: boolean;
  validate(target: T, context?: ValidationContext): ValidationResult;
  validateAsync(target: T, context?: ValidationContext): Promise<ValidationResult>;
}

export abstract class BaseValidationRule<T> implements ValidationRule<T> {
  public readonly priority: number;
  public readonly enabled: boolean;

  constructor(priority: number = 0, enabled: boolean = true) {
    this.priority = priority;
    this.enabled = enabled;
  }

  public abstract validate(target: T, context?: ValidationContext): ValidationResult;
  
  public async validateAsync(target: T, context?: ValidationContext): Promise<ValidationResult> {
    return this.validate(target, context);
  }
}
