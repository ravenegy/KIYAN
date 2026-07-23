import { Result } from '../../../../core';
import { PermissionDto, PagedPermissionDto } from '../dto';

export interface IPermissionReadService {
  getPermissionById(id: string): Promise<Result<PermissionDto>>;
  getPermissions(params: Readonly<{ page: number; pageSize: number }>): Promise<Result<PagedPermissionDto>>;
  searchPermissions(params: Readonly<{ query: string; page: number; pageSize: number }>): Promise<Result<PagedPermissionDto>>;
}
