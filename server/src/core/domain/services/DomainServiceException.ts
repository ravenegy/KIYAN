import { DomainException } from '../exceptions/DomainException';

export class DomainServiceException extends DomainException {
  constructor(message: string, code: string = 'DOMAIN_SERVICE_ERROR', metadata?: Record<string, unknown>) {
    super(message, code, metadata);
    this.name = this.constructor.name;
  }
}
