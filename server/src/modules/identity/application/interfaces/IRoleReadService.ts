import { Result } from '../../../../core';
import { RoleDto, PagedRoleDto } from '../dto';

export interface IRoleReadService {
  getRoleById(id: string): Promise<Result<RoleDto>>;
  getRoles(params: Readonly<{ page: number; pageSize: number }>): Promise<Result<PagedRoleDto>>;
  searchRoles(params: Readonly<{ query: string; page: number; pageSize: number }>): Promise<Result<PagedRoleDto>>;
}
