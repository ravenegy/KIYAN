import { IBusinessRule } from './IBusinessRule';
import { RuleEvaluationResult } from './RuleEvaluationResult';
import { RuleViolation } from './RuleViolation';

export class RuleSet {
  private readonly rules: Set<IBusinessRule> = new Set();

  public register(rule: IBusinessRule): this {
    this.rules.add(rule);
    return this;
  }

  public evaluate(): RuleEvaluationResult {
    return this.evaluateAll();
  }

  public evaluateAll(): RuleEvaluationResult {
    const violations: RuleViolation[] = [];
    for (const rule of this.rules) {
      if (rule.isBroken()) {
        violations.push(new RuleViolation(rule.code, rule.message, undefined, rule.metadata));
      }
    }
    if (violations.length > 0) {
      return RuleEvaluationResult.failure(violations);
    }
    return RuleEvaluationResult.success();
  }

  public clear(): void {
    this.rules.clear();
  }
}
