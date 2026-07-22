import { IdentityApplicationException } from './IdentityApplicationException';

export class UserNotFoundException extends IdentityApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'USERNOTFOUND', metadata);
    this.name = 'UserNotFoundException';
  }
}
