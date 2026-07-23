export interface UserSessionModel {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  expires_at: Date;
  is_revoked: boolean;
  created_at: Date;
  version: number;
}
