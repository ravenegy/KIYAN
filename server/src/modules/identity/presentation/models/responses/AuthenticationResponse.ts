export interface AuthenticationResponse {
  readonly token: string;
  readonly refreshToken?: string;
  readonly user: {
    readonly id: string;
    readonly username: string;
    readonly email: string;
  };
}
