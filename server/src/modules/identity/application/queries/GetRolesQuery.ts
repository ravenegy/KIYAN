import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { RoleDto } from '../dto';
import { PagedRoleDto } from '../dto';

export class GetRolesQuery implements IQuery<Result<PagedRoleDto>> {
  public readonly type: string = 'GetRolesQuery';
  public readonly _resultType?: Result<PagedRoleDto>;

  constructor(public readonly params: Readonly<{ page: number; pageSize: number }>) {}
}
