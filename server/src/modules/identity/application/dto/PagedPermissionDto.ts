import { PermissionDto } from './PermissionDto';
export interface PagedPermissionDto {
  readonly items: ReadonlyArray<PermissionDto>;
  readonly totalCount: number;
  readonly page: number;
  readonly pageSize: number;
}
