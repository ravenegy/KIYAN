export interface PermissionAssignmentDto {
  id: string;
  userId: string;
  permissionId: string;
  contextId?: string;
  contextType?: string;
}
