import { DomainException } from '../exceptions/DomainException';
import { IBusinessRule } from './IBusinessRule';

export class BusinessRuleViolation extends DomainException {
  public readonly rule: IBusinessRule;

  constructor(rule: IBusinessRule) {
    super(rule.message, rule.code, rule.metadata);
    this.rule = rule;
    this.name = this.constructor.name;
  }
}
