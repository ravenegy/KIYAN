import { RoleAssignment } from '../entities/RoleAssignment';

export interface IRoleAssignmentRepository {
  findById(id: string): Promise<RoleAssignment | null>;
  save(entity: RoleAssignment): Promise<void>;
  delete(id: string): Promise<void>;
}
