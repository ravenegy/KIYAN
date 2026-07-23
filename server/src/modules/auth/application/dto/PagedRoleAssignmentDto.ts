import { RoleAssignmentDto } from './RoleAssignmentDto';
export interface PagedRoleAssignmentDto {
  items: RoleAssignmentDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
