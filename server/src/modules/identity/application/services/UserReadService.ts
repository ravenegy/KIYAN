import { Result, IMediator } from '../../../../core';
import { IUserReadService } from '../interfaces';
import { GetUserByIdQuery, GetUserByEmailQuery, GetUserByUsernameQuery, GetUsersQuery, SearchUsersQuery } from '../queries';
import { UserDto, PagedUserDto } from '../dto';

export class UserReadService implements IUserReadService {
  constructor(private readonly mediator: IMediator) {}

  public async getUserById(id: string): Promise<Result<UserDto>> {
    return this.mediator.query(new GetUserByIdQuery({ id }));
  }
  public async getUserByEmail(email: string): Promise<Result<UserDto>> {
    return this.mediator.query(new GetUserByEmailQuery({ email }));
  }
  public async getUserByUsername(username: string): Promise<Result<UserDto>> {
    return this.mediator.query(new GetUserByUsernameQuery({ username }));
  }
  public async getUsers(params: Readonly<{ page: number; pageSize: number; search?: string }>): Promise<Result<PagedUserDto>> {
    return this.mediator.query(new GetUsersQuery(params));
  }
  public async searchUsers(params: Readonly<{ query: string; page: number; pageSize: number }>): Promise<Result<PagedUserDto>> {
    return this.mediator.query(new SearchUsersQuery(params));
  }
}
