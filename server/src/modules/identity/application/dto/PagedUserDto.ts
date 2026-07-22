import { UserDto } from './UserDto';
export interface PagedUserDto {
  readonly items: ReadonlyArray<UserDto>;
  readonly totalCount: number;
  readonly page: number;
  readonly pageSize: number;
}
