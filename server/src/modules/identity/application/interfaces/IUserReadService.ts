import { Result } from '../../../../core';
import { UserDto, PagedUserDto } from '../dto';

export interface IUserReadService {
  getUserById(id: string): Promise<Result<UserDto>>;
  getUserByEmail(email: string): Promise<Result<UserDto>>;
  getUserByUsername(username: string): Promise<Result<UserDto>>;
  getUsers(params: Readonly<{ page: number; pageSize: number; search?: string }>): Promise<Result<PagedUserDto>>;
  searchUsers(params: Readonly<{ query: string; page: number; pageSize: number }>): Promise<Result<PagedUserDto>>;
}
