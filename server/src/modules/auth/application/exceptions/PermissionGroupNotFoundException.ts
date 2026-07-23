import { AuthApplicationException } from './AuthApplicationException';

export class PermissionGroupNotFoundException extends AuthApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'PERMISSIONGROUPNOTFOUND', metadata);
    this.name = 'PermissionGroupNotFoundException';
  }
}
