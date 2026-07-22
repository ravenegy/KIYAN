import { DomainException } from '../../../../core/domain/exceptions/DomainException';

export class IdentityException extends DomainException {
  constructor(message: string, code?: string, metadata?: Record<string, unknown>) {
    super(message, code, metadata);
    this.name = 'IdentityException';
  }
}
