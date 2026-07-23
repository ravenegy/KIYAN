import { ValidationRule } from './ValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationContext } from './ValidationContext';
import { ValidationOptions } from './ValidationOptions';

export class ValidationEngine {
  public evaluate<T>(target: T, rule: ValidationRule<T>, context?: ValidationContext): ValidationResult {
    if (!rule.enabled) return ValidationResult.success();
    return rule.validate(target, context);
  }

  public evaluateMany<T>(
    target: T, 
    rules: ReadonlyArray<ValidationRule<T>>, 
    context?: ValidationContext, 
    options?: ValidationOptions
  ): ValidationResult {
    return this.evaluateSequential(target, rules, context, options);
  }

  public evaluateSequential<T>(
    target: T, 
    rules: ReadonlyArray<ValidationRule<T>>, 
    context?: ValidationContext, 
    options?: ValidationOptions
  ): ValidationResult {
    let result = ValidationResult.success();
    const stopOnFirstFailure = options?.stopOnFirstFailure ?? false;
    
    const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

    for (const rule of sortedRules) {
      if (!rule.enabled) continue;

      const ruleResult = rule.validate(target, context);
      result = result.merge(ruleResult);

      if (stopOnFirstFailure && !result.isValid) {
        break;
      }
    }

    return result;
  }

  public async evaluateParallel<T>(
    target: T, 
    rules: ReadonlyArray<ValidationRule<T>>, 
    context?: ValidationContext
  ): Promise<ValidationResult> {
    const activeRules = rules.filter(r => r.enabled);
    const promises = activeRules.map(r => r.validateAsync(target, context));
    const results = await Promise.all(promises);
    return ValidationResult.combine(results);
  }
}
