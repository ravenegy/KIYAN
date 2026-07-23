export interface GrantPermissionRequest {
  readonly userId?: string;
  readonly roleId?: string;
  readonly permissionId: string;
}
