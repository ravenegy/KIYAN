import { AuthorizationDomainException } from './AuthorizationDomainException';

export class PermissionNotFoundException extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'PERMISSIONNOTFOUND', metadata);
    this.name = 'PermissionNotFoundException';
  }
}
