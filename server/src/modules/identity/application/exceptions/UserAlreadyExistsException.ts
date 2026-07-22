import { IdentityApplicationException } from './IdentityApplicationException';

export class UserAlreadyExistsException extends IdentityApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'USERALREADYEXISTS', metadata);
    this.name = 'UserAlreadyExistsException';
  }
}
