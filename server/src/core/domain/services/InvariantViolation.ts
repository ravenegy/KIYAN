import { DomainException } from '../exceptions/DomainException';

export class InvariantViolation extends DomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'INVARIANT_VIOLATION', metadata);
    this.name = this.constructor.name;
  }
}
