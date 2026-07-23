import { PermissionGroup } from '../entities/PermissionGroup';

export interface IPermissionGroupRepository {
  findById(id: string): Promise<PermissionGroup | null>;
  save(entity: PermissionGroup): Promise<void>;
  delete(id: string): Promise<void>;
}
