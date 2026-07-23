export interface UserDto {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly status: string;
  readonly roles: ReadonlyArray<string>;
  readonly permissions: ReadonlyArray<string>;
  readonly lastLoginAt?: Date;
  readonly createdAt: Date;
}
