import { IRoleReadService } from '../../application/interfaces/IRoleReadService';
import { IRoleWriteService } from '../../application/interfaces/IRoleWriteService';
import { RoleResponse, PagedResponse, ApiResponse } from '../models/responses';
import { Result } from '../../../../core';

export class RolesController {
  constructor(
    private readonly roleReadService: IRoleReadService,
    private readonly roleWriteService: IRoleWriteService
  ) {}

  async getRoleById(id: string): Promise<ApiResponse<RoleResponse>> {
    const result = await this.roleReadService.getRoleById(id);
    return this.mapToResponse(result as any);
  }

  async getRoles(page: number = 1, pageSize: number = 10): Promise<ApiResponse<PagedResponse<RoleResponse>>> {
    const result = await this.roleReadService.getRoles({ page, pageSize });
    return this.mapToResponse(result as any);
  }

  async createRole(request: { name: string; description: string }): Promise<ApiResponse<string>> {
    const result = await this.roleWriteService.createRole(request);
    return this.mapToResponse(result);
  }

  async updateRole(request: { id: string; name?: string; description?: string }): Promise<ApiResponse<void>> {
    const result = await this.roleWriteService.updateRole(request);
    return this.mapToResponse(result);
  }

  async deleteRole(id: string): Promise<ApiResponse<void>> {
    const result = await this.roleWriteService.deleteRole(id);
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

