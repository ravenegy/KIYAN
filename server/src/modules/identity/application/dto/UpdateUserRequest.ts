export interface UpdateUserRequest {
  readonly id: string;
  readonly email?: string;
  readonly status?: string;
}
