export interface RoleAssignmentDto {
  id: string;
  userId: string;
  roleId: string;
  contextId?: string;
  contextType?: string;
}
