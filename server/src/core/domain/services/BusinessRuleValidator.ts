import { IBusinessRule } from './IBusinessRule';
import { BusinessRuleViolation } from './BusinessRuleViolation';

export class BusinessRuleValidator {
  public static validate(rule: IBusinessRule): void {
    if (rule.isBroken()) {
      throw new BusinessRuleViolation(rule);
    }
  }

  public static validateMany(rules: ReadonlyArray<IBusinessRule>): void {
    for (const rule of rules) {
      this.validate(rule);
    }
  }

  public static throwIfBroken(rule: IBusinessRule): void {
    this.validate(rule);
  }
}
