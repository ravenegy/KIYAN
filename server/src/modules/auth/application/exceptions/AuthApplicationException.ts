import { ApplicationException } from '../../../../core/application/exceptions/ApplicationException';

export class AuthApplicationException extends ApplicationException {
  constructor(message: string, code?: string, metadata?: Record<string, unknown>) {
    super(message, code, metadata);
    this.name = 'AuthApplicationException';
  }
}
