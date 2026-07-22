import { AuthorizationDomainException } from './AuthorizationDomainException';

export class PermissionConflictException extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'PERMISSIONCONFLICT', metadata);
    this.name = 'PermissionConflictException';
  }
}
