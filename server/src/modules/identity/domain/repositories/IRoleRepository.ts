import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { Role } from '../entities/Role';
import { RoleId } from '../value-objects/RoleId';

export interface IRoleRepository extends IRepository<Role, RoleId> {
  findByName(name: string): Promise<Role | null>;
  existsByName(name: string): Promise<boolean>;
}
