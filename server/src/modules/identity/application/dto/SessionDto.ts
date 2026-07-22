export interface SessionDto {
  readonly id: string;
  readonly userId: string;
  readonly expiresAt: Date;
  readonly status: string;
}
