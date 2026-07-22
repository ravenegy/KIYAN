import { IDomainValidator } from './IDomainValidator';
import { ValidationResult } from './ValidationResult';
import { ValidationContext } from './ValidationContext';
import { ValidationOptions } from './ValidationOptions';
import { ValidationRuleSet } from './ValidationRuleSet';

export abstract class DomainValidator<T> implements IDomainValidator<T> {
  protected readonly ruleSet: ValidationRuleSet<T>;

  protected constructor() {
    this.ruleSet = new ValidationRuleSet<T>();
    this.configureRules();
  }

  protected abstract configureRules(): void;

  public validate(target: T, context?: ValidationContext, options?: ValidationOptions): ValidationResult {
    return this.ruleSet.evaluate(target, context, options);
  }

  public async validateAsync(target: T, context?: ValidationContext, options?: ValidationOptions): Promise<ValidationResult> {
    return this.ruleSet.evaluateAsync(target, context, options);
  }
}
