export interface RoleModel {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // List of Permission IDs
  created_at: Date;
  version: number;
}
