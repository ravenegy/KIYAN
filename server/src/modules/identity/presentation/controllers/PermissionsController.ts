import { IPermissionReadService } from '../../application/interfaces/IPermissionReadService';
import { IPermissionWriteService } from '../../application/interfaces/IPermissionWriteService';
import { PermissionResponse, PagedResponse, ApiResponse } from '../models/responses';
import { Result } from '../../../../core';

export class PermissionsController {
  constructor(
    private readonly permissionReadService: IPermissionReadService,
    private readonly permissionWriteService: IPermissionWriteService
  ) {}

  async getPermissionById(id: string): Promise<ApiResponse<PermissionResponse>> {
    const result = await this.permissionReadService.getPermissionById(id);
    return this.mapToResponse(result as any);
  }

  async getPermissions(page: number = 1, pageSize: number = 10): Promise<ApiResponse<PagedResponse<PermissionResponse>>> {
    const result = await this.permissionReadService.getPermissions({ page, pageSize });
    return this.mapToResponse(result as any);
  }

  async createPermission(request: { name: string; code: string; description: string; effect: string }): Promise<ApiResponse<string>> {
    const result = await this.permissionWriteService.createPermission(request);
    return this.mapToResponse(result);
  }

  async updatePermission(request: { id: string; name?: string; description?: string; effect?: string }): Promise<ApiResponse<void>> {
    const result = await this.permissionWriteService.updatePermission(request);
    return this.mapToResponse(result);
  }

  async deletePermission(id: string): Promise<ApiResponse<void>> {
    const result = await this.permissionWriteService.deletePermission(id);
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

