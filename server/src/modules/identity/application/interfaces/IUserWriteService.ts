import { Result } from '../../../../core';
import { CreateUserRequest, UpdateUserRequest, AssignRoleRequest, GrantPermissionRequest } from '../dto';

export interface IUserWriteService {
  createUser(request: CreateUserRequest): Promise<Result<string>>;
  updateUser(request: UpdateUserRequest): Promise<Result<void>>;
  deleteUser(id: string): Promise<Result<void>>;
  activateUser(id: string): Promise<Result<void>>;
  deactivateUser(id: string): Promise<Result<void>>;
  lockUser(id: string): Promise<Result<void>>;
  unlockUser(id: string): Promise<Result<void>>;
  changeEmail(id: string, newEmail: string): Promise<Result<void>>;
  changeUsername(id: string, newUsername: string): Promise<Result<void>>;
  changePassword(id: string, newPasswordHash: string): Promise<Result<void>>;
  resetPassword(email: string): Promise<Result<void>>;
  assignRole(request: AssignRoleRequest): Promise<Result<void>>;
  removeRole(userId: string, roleId: string): Promise<Result<void>>;
  grantPermission(request: GrantPermissionRequest): Promise<Result<void>>;
  revokePermission(userId: string, permissionId: string): Promise<Result<void>>;
}
