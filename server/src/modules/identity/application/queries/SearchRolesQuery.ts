import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { RoleDto } from '../dto';
import { PagedRoleDto } from '../dto';

export class SearchRolesQuery implements IQuery<Result<PagedRoleDto>> {
  public readonly type: string = 'SearchRolesQuery';
  public readonly _resultType?: Result<PagedRoleDto>;

  constructor(public readonly params: Readonly<{ query: string; page: number; pageSize: number }>) {}
}
