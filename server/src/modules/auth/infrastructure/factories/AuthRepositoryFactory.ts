import { IPermissionGroupRepository } from '../../domain/repositories/IPermissionGroupRepository';
import { IPermissionAssignmentRepository } from '../../domain/repositories/IPermissionAssignmentRepository';
import { IRoleAssignmentRepository } from '../../domain/repositories/IRoleAssignmentRepository';
import { IRoleHierarchyRepository } from '../../domain/repositories/IRoleHierarchyRepository';
import { PermissionGroupRepository } from '../repositories/PermissionGroupRepository';
import { PermissionAssignmentRepository } from '../repositories/PermissionAssignmentRepository';
import { RoleAssignmentRepository } from '../repositories/RoleAssignmentRepository';
import { RoleHierarchyRepository } from '../repositories/RoleHierarchyRepository';

export class AuthRepositoryFactory {
  public static createPermissionGroupRepository(): IPermissionGroupRepository {
    return new PermissionGroupRepository();
  }

  public static createPermissionAssignmentRepository(): IPermissionAssignmentRepository {
    return new PermissionAssignmentRepository();
  }

  public static createRoleAssignmentRepository(): IRoleAssignmentRepository {
    return new RoleAssignmentRepository();
  }

  public static createRoleHierarchyRepository(): IRoleHierarchyRepository {
    return new RoleHierarchyRepository();
  }
}
