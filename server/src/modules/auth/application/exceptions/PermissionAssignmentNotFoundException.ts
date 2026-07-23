import { AuthApplicationException } from './AuthApplicationException';

export class PermissionAssignmentNotFoundException extends AuthApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'PERMISSIONASSIGNMENTNOTFOUND', metadata);
    this.name = 'PermissionAssignmentNotFoundException';
  }
}
