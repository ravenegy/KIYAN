export interface RefreshTokenModel {
  id: string;
  token: string;
  user_id: string;
  expires_at: Date;
  is_revoked: boolean;
  created_at: Date;
  version: number;
}
