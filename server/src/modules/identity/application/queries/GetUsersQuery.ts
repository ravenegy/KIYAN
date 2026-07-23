import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { UserDto } from '../dto';
import { PagedUserDto } from '../dto';

export class GetUsersQuery implements IQuery<Result<PagedUserDto>> {
  public readonly type: string = 'GetUsersQuery';
  public readonly _resultType?: Result<PagedUserDto>;

  constructor(public readonly params: Readonly<{ page: number; pageSize: number; search?: string }>) {}
}
