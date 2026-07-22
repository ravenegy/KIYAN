import { RuleViolation } from './RuleViolation';

export class RuleEvaluationResult {
  public readonly isValid: boolean;
  public readonly violations: ReadonlyArray<RuleViolation>;
  public readonly warnings: ReadonlyArray<RuleViolation>;

  constructor(isValid: boolean, violations: RuleViolation[] = [], warnings: RuleViolation[] = []) {
    this.isValid = isValid;
    this.violations = Object.freeze([...violations]);
    this.warnings = Object.freeze([...warnings]);
    Object.freeze(this);
  }

  public static success(warnings: RuleViolation[] = []): RuleEvaluationResult {
    return new RuleEvaluationResult(true, [], warnings);
  }

  public static failure(violations: RuleViolation[], warnings: RuleViolation[] = []): RuleEvaluationResult {
    return new RuleEvaluationResult(false, violations, warnings);
  }
}
