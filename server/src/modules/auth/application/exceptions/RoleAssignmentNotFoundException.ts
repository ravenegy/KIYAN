import { AuthApplicationException } from './AuthApplicationException';

export class RoleAssignmentNotFoundException extends AuthApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'ROLEASSIGNMENTNOTFOUND', metadata);
    this.name = 'RoleAssignmentNotFoundException';
  }
}
