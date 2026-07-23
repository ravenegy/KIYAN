import { Result, IMediator } from '../../../../core';
import { IUserWriteService } from '../interfaces';
import { CreateUserCommand, UpdateUserCommand, DeleteUserCommand, ActivateUserCommand, DeactivateUserCommand, LockUserCommand, UnlockUserCommand, ChangeEmailCommand, ChangeUsernameCommand, ChangePasswordCommand, ResetPasswordCommand, AssignRoleCommand, RemoveRoleCommand, GrantPermissionCommand, RevokePermissionCommand } from '../commands';
import { CreateUserRequest, UpdateUserRequest, AssignRoleRequest, GrantPermissionRequest } from '../dto';

export class UserWriteService implements IUserWriteService {
  constructor(private readonly mediator: IMediator) {}

  public async createUser(request: CreateUserRequest): Promise<Result<string>> {
    return this.mediator.send(new CreateUserCommand(request));
  }
  public async updateUser(request: UpdateUserRequest): Promise<Result<void>> {
    return this.mediator.send(new UpdateUserCommand(request));
  }
  public async deleteUser(id: string): Promise<Result<void>> {
    return this.mediator.send(new DeleteUserCommand({ id }));
  }
  public async activateUser(id: string): Promise<Result<void>> {
    return this.mediator.send(new ActivateUserCommand({ id }));
  }
  public async deactivateUser(id: string): Promise<Result<void>> {
    return this.mediator.send(new DeactivateUserCommand({ id }));
  }
  public async lockUser(id: string): Promise<Result<void>> {
    return this.mediator.send(new LockUserCommand({ id }));
  }
  public async unlockUser(id: string): Promise<Result<void>> {
    return this.mediator.send(new UnlockUserCommand({ id }));
  }
  public async changeEmail(id: string, newEmail: string): Promise<Result<void>> {
    return this.mediator.send(new ChangeEmailCommand({ id, newEmail }));
  }
  public async changeUsername(id: string, newUsername: string): Promise<Result<void>> {
    return this.mediator.send(new ChangeUsernameCommand({ id, newUsername }));
  }
  public async changePassword(id: string, newPasswordHash: string): Promise<Result<void>> {
    return this.mediator.send(new ChangePasswordCommand({ id, newPasswordHash }));
  }
  public async resetPassword(email: string): Promise<Result<void>> {
    return this.mediator.send(new ResetPasswordCommand({ email }));
  }
  public async assignRole(request: AssignRoleRequest): Promise<Result<void>> {
    return this.mediator.send(new AssignRoleCommand(request));
  }
  public async removeRole(userId: string, roleId: string): Promise<Result<void>> {
    return this.mediator.send(new RemoveRoleCommand({ userId, roleId }));
  }
  public async grantPermission(request: GrantPermissionRequest): Promise<Result<void>> {
    return this.mediator.send(new GrantPermissionCommand(request));
  }
  public async revokePermission(userId: string, permissionId: string): Promise<Result<void>> {
    return this.mediator.send(new RevokePermissionCommand({ userId, permissionId }));
  }
}
