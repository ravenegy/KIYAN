import { ValidationRule } from './ValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationContext } from './ValidationContext';
import { ValidationOptions } from './ValidationOptions';

export class ValidationRuleSet<T> {
  private rules: ValidationRule<T>[] = [];

  public register(rule: ValidationRule<T>): this {
    this.rules.push(rule);
    this.sortRules();
    return this;
  }

  public remove(rule: ValidationRule<T>): this {
    this.rules = this.rules.filter(r => r !== rule);
    return this;
  }

  public clear(): void {
    this.rules = [];
  }

  private sortRules(): void {
    this.rules.sort((a, b) => b.priority - a.priority);
  }

  public evaluate(target: T, context?: ValidationContext, options?: ValidationOptions): ValidationResult {
    let result = ValidationResult.success();
    const stopOnFirstFailure = options?.stopOnFirstFailure ?? false;

    for (const rule of this.rules) {
      if (!rule.enabled) continue;

      const ruleResult = rule.validate(target, context);
      result = result.merge(ruleResult);

      if (stopOnFirstFailure && !result.isValid) {
        break;
      }
    }

    return result;
  }

  public async evaluateAsync(target: T, context?: ValidationContext, options?: ValidationOptions): Promise<ValidationResult> {
    let result = ValidationResult.success();
    const stopOnFirstFailure = options?.stopOnFirstFailure ?? false;

    for (const rule of this.rules) {
      if (!rule.enabled) continue;

      const ruleResult = await rule.validateAsync(target, context);
      result = result.merge(ruleResult);

      if (stopOnFirstFailure && !result.isValid) {
        break;
      }
    }

    return result;
  }
  
  public getRules(): ReadonlyArray<ValidationRule<T>> {
    return Object.freeze([...this.rules]);
  }
}
