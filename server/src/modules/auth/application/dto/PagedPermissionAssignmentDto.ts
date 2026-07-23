import { PermissionAssignmentDto } from './PermissionAssignmentDto';
export interface PagedPermissionAssignmentDto {
  items: PermissionAssignmentDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
