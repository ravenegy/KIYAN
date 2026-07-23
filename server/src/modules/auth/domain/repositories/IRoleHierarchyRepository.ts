import { RoleHierarchy } from '../entities/RoleHierarchy';

export interface IRoleHierarchyRepository {
  findById(id: string): Promise<RoleHierarchy | null>;
  save(entity: RoleHierarchy): Promise<void>;
  delete(id: string): Promise<void>;
}
