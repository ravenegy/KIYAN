import { AuthorizationDomainException } from './AuthorizationDomainException';

export class RoleHierarchyException extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'ROLEHIERARCHY', metadata);
    this.name = 'RoleHierarchyException';
  }
}
