import { AuthorizationDomainException } from './AuthorizationDomainException';

export class RoleNotFoundException extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'ROLENOTFOUND', metadata);
    this.name = 'RoleNotFoundException';
  }
}
