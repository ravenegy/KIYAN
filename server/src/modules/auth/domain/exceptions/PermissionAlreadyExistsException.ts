import { AuthorizationDomainException } from './AuthorizationDomainException';

export class PermissionAlreadyExistsException extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'PERMISSIONALREADYEXISTS', metadata);
    this.name = 'PermissionAlreadyExistsException';
  }
}
