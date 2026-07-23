import { IUserReadService } from '../../application/interfaces/IUserReadService';
import { IUserWriteService } from '../../application/interfaces/IUserWriteService';
import { ChangePasswordRequest, ChangeEmailRequest, ChangeUsernameRequest, AssignRoleRequest, GrantPermissionRequest } from '../models/requests';
import { UserResponse, PagedResponse, ApiResponse } from '../models/responses';
import { CreateUserRequest, UpdateUserRequest } from '../../application/dto';
import { Result } from '../../../../core';

export class UsersController {
  constructor(
    private readonly userReadService: IUserReadService,
    private readonly userWriteService: IUserWriteService
  ) {}

  async getUserById(id: string): Promise<ApiResponse<UserResponse>> {
    const result = await this.userReadService.getUserById(id);
    return this.mapToResponse(result as any);
  }

  async getUsers(page: number = 1, pageSize: number = 10): Promise<ApiResponse<PagedResponse<UserResponse>>> {
    const result = await this.userReadService.getUsers({ page, pageSize });
    return this.mapToResponse(result as any);
  }

  async createUser(request: CreateUserRequest): Promise<ApiResponse<string>> {
    const result = await this.userWriteService.createUser(request);
    return this.mapToResponse(result);
  }

  async updateUser(request: UpdateUserRequest): Promise<ApiResponse<void>> {
    const result = await this.userWriteService.updateUser(request);
    return this.mapToResponse(result);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    const result = await this.userWriteService.deleteUser(id);
    return this.mapToResponse(result);
  }

  async changePassword(id: string, request: ChangePasswordRequest): Promise<ApiResponse<void>> {
    const result = await this.userWriteService.changePassword(id, request.newPassword);
    return this.mapToResponse(result);
  }

  async changeEmail(id: string, request: ChangeEmailRequest): Promise<ApiResponse<void>> {
    const result = await this.userWriteService.changeEmail(id, request.newEmail);
    return this.mapToResponse(result);
  }

  async assignRole(request: AssignRoleRequest & { userId: string }): Promise<ApiResponse<void>> {
    const result = await this.userWriteService.assignRole(request);
    return this.mapToResponse(result);
  }

  async grantPermission(request: GrantPermissionRequest & { userId: string }): Promise<ApiResponse<void>> {
    const result = await this.userWriteService.grantPermission(request);
    return this.mapToResponse(result);
  }

  private mapToResponse<T>(result: Result<T>): ApiResponse<T> {
    if (result.isSuccess) {
      return { success: true, data: result.value };
    }
    return {
      success: false,
      error: {
        code: result.error?.code || 'UNKNOWN_ERROR',
        message: result.error?.message || 'An unknown error occurred',
        details: result.errors?.map(e => e.message)
      }
    };
  }
}

