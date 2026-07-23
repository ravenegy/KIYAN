export interface RefreshTokenDto {
  readonly id: string;
  readonly userId: string;
  readonly expiresAt: Date;
  readonly isExpired: boolean;
}
