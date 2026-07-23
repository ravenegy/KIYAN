import { AuthorizationDomainException } from './AuthorizationDomainException';

export class RoleAlreadyExistsException extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'ROLEALREADYEXISTS', metadata);
    this.name = 'RoleAlreadyExistsException';
  }
}
