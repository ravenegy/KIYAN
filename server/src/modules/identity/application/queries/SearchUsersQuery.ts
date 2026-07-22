import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { UserDto } from '../dto';
import { PagedUserDto } from '../dto';

export class SearchUsersQuery implements IQuery<Result<PagedUserDto>> {
  public readonly type: string = 'SearchUsersQuery';
  public readonly _resultType?: Result<PagedUserDto>;

  constructor(public readonly params: Readonly<{ query: string; page: number; pageSize: number }>) {}
}
