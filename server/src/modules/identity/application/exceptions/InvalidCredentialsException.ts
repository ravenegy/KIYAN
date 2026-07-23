import { IdentityApplicationException } from './IdentityApplicationException';

export class InvalidCredentialsException extends IdentityApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'INVALIDCREDENTIALS', metadata);
    this.name = 'InvalidCredentialsException';
  }
}
