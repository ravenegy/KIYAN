import { IBusinessRule } from './IBusinessRule';
import { RuleEvaluationResult } from './RuleEvaluationResult';
import { RuleViolation } from './RuleViolation';

export class RuleEngine {
  public evaluate(rule: IBusinessRule): RuleEvaluationResult {
    if (rule.isBroken()) {
      return RuleEvaluationResult.failure([
        new RuleViolation(rule.code, rule.message, undefined, rule.metadata)
      ]);
    }
    return RuleEvaluationResult.success();
  }

  public evaluateMany(rules: ReadonlyArray<IBusinessRule>): RuleEvaluationResult {
    const violations: RuleViolation[] = [];
    for (const rule of rules) {
      if (rule.isBroken()) {
        violations.push(new RuleViolation(rule.code, rule.message, undefined, rule.metadata));
      }
    }
    
    if (violations.length > 0) {
      return RuleEvaluationResult.failure(violations);
    }
    return RuleEvaluationResult.success();
  }

  public async evaluateAsync(rule: IBusinessRule | Promise<IBusinessRule>): Promise<RuleEvaluationResult> {
    const resolvedRule = await rule;
    return this.evaluate(resolvedRule);
  }

  public async evaluateParallel(rules: ReadonlyArray<IBusinessRule | Promise<IBusinessRule>>): Promise<RuleEvaluationResult> {
    const resolvedRules = await Promise.all(rules);
    return this.evaluateMany(resolvedRules);
  }
}
