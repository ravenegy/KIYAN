import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { Permission } from '../entities/Permission';
import { PermissionId } from '../value-objects/PermissionId';

export interface IPermissionRepository extends IRepository<Permission, PermissionId> {
  findByCode(code: string): Promise<Permission | null>;
  existsByCode(code: string): Promise<boolean>;
}
