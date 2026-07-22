import { RoleDto } from './RoleDto';
export interface PagedRoleDto {
  readonly items: ReadonlyArray<RoleDto>;
  readonly totalCount: number;
  readonly page: number;
  readonly pageSize: number;
}
