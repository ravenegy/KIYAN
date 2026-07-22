import { ApplicationException } from '../../../../core/application/exceptions/ApplicationException';

export class IdentityApplicationException extends ApplicationException {
  constructor(message: string, code?: string, metadata?: Record<string, unknown>) {
    super(message, code, metadata);
    this.name = 'IdentityApplicationException';
  }
}
