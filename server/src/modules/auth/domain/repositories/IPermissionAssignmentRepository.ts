import { PermissionAssignment } from '../entities/PermissionAssignment';

export interface IPermissionAssignmentRepository {
  findById(id: string): Promise<PermissionAssignment | null>;
  save(entity: PermissionAssignment): Promise<void>;
  delete(id: string): Promise<void>;
}
