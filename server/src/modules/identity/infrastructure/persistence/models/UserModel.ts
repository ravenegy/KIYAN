export interface UserModel {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  status: number;
  roles: string[]; // List of Role IDs
  claims: Array<{ type: string; value: string }>;
  permissions: string[]; // List of Permission IDs
  last_login_at: Date | null;
  password_changed_at: Date | null;
  failed_login_attempts: number;
  lockout_until: Date | null;
  created_at: Date;
  version: number;
}
