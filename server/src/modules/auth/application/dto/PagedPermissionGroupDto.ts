import { PermissionGroupDto } from './PermissionGroupDto';
export interface PagedPermissionGroupDto {
  items: PermissionGroupDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
