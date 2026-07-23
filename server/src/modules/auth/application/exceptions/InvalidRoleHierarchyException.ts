import { AuthApplicationException } from './AuthApplicationException';

export class InvalidRoleHierarchyException extends AuthApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'INVALIDROLEHIERARCHY', metadata);
    this.name = 'InvalidRoleHierarchyException';
  }
}
